import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { UnknownAction } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onResolutionTimeout = (reject: (...args: any[]) => void) => () => reject('ERR_RES_TIMEOUT');

const timeout = process.env.NODE_ENV === 'production' ? 180000 : 120000;

type AnyFunction = (...args: any[]) => any;

export function useAction<T extends AnyFunction>(creator: T) {
  const dispatch = useDispatch() as (action: UnknownAction) => Promise<any>;
  return useMemo(() => {
    return (...args: Parameters<T>) => dispatch(creator(...args));
  }, [creator, dispatch]);
}

export function useActionAsync<T extends AnyFunction>(creator: T) {
  const dispatch = useDispatch();
  return useMemo(() => {
    return (...args: Parameters<T>): Promise<any> => {
      return Promise.race([
        new Promise((resolve, reject) => {
          if (args.length === 0) {
            args.push(undefined);
          }
          dispatch(creator(...args.concat({ resolve, reject })));
        }),
        new Promise((_, reject) => setTimeout(onResolutionTimeout(reject), timeout)),
      ]);
    };
  }, [creator, dispatch]);
}
