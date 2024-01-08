import { of, concat, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { Action } from '../types/Action';
import { isAction } from 'redux';
import type { OperatorFunction } from 'rxjs';

type Actions = Action<string, any> | Action<string, any>[];

export const asyncConcat = (actions: Actions) => {
  if (!(actions instanceof Array)) {
    return concat(of(actions));
  }
  const seq = actions.map(a => of(a));
  return concat(...seq);
};

/**
 * allows to return plain action object instead of observable from epic handler
 * Must be final operator in pipe
 */
export const concatActions = () => mergeMap(asyncConcat);

/**
 * allows to return no action from epic.
 * Must be final operator in pipe
 */
export const emptyAction = () => mergeMap(() => EMPTY);

export const notifySuccess = (action: Action<string, any>) => {
  if (action.meta?.resolve) {
    action.meta.resolve();
  }
};

export const notifyFail = (action: Action<string, any>, message: string | Error = '') => {
  const error = typeof message === 'string' ? { message } : message;
  if (action.meta?.reject) {
    action.meta.reject(error);
  }
};

/**
 * patched ofType from redux-observable
 * augments action with promise so actual action can be awaited
 */
export function ofType<
  // All possible actions your app can dispatch
  Input,
  // The types you want to filter for
  Type extends string,
  // The resulting actions that match the above types
  Output extends Input = Extract<Input, Action<Type>>,
>(...types: [Type, ...Type[]]): OperatorFunction<Input, Output> {
  const len = types.length;

  return filter(
    len === 1
      ? (action): action is Output => (isAction(action) && action.type === types[0] ? augmentAction(action) : false)
      : (action): action is Output => {
          if (isAction(action)) {
            for (let i = 0; i < len; i++) {
              if (action.type === types[i]) {
                augmentAction(action);

                return true;
              }
            }
          }
          return false;
        },
  );
}

function augmentAction(action: any) {
  if (!action.meta) {
    action.meta = {};
  }

  action.meta.promise = new Promise((resolve, reject) => {
    action.meta.resolve = resolve;
    action.meta.reject = reject;
  });
  return true;
}
