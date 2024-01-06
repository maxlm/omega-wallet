import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { UnknownAction } from 'redux';
import { ERROR_SYMBOL } from '../webext-redux/shared';

type AnyFunction = (...args: any[]) => any;

export function useActionAsync<T extends AnyFunction>(creator: T) {
  const dispatch = useDispatch() as (action: UnknownAction) => Promise<any>;
  return useMemo(() => {
    return (...args: Parameters<T>) => {
      if (args.length === 0) {
        args.push({});
      }

      return dispatch(creator(...args.concat({}))).then(actionPayload => {
        if (actionPayload[ERROR_SYMBOL]) {
          return Promise.reject<any>(actionPayload[ERROR_SYMBOL]);
        } else {
          return Promise.resolve<any>(actionPayload);
        }
      });
    };
  }, [creator, dispatch]);
}
