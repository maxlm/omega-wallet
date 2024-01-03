import { generateEventId } from '@root/src/shared/utils';

export interface Rpc {
  call<T extends any = unknown>(method: string, params: unknown): Promise<T>;
}

export class WindowPostMessageRpc implements Rpc {
  constructor(private window: Window) {}
  call = <T extends any = unknown>(method: string, params: unknown) => {
    return new Promise<T>((resolve, reject) => {
      const messageId = generateEventId();

      window.addEventListener(
        messageId,
        ({ detail }: CustomEvent) => {
          const response = JSON.parse(detail);
          if (response.data.error) reject(response.data.error);
          else resolve(response.data.response);
        },
        {
          once: true,
          passive: true,
        },
      );

      this.window.postMessage(
        {
          messageId,
          method,
          params,
        },
        '*',
      );
    });
  };
}
