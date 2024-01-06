import { getBrowserApi } from './getBrowserApi';

export const connectToBackground = (name: string) => getBrowserApi().runtime.connect({ name });
