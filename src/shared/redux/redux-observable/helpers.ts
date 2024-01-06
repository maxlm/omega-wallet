import { of, concat, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Action } from '../types/Action';

type Actions = Action<string, any> | Action<string, any>[];

export const asyncConcat = (actions: Actions) => {
  if (!(actions instanceof Array)) {
    return concat(of(actions));
  }
  const seq = actions.map(a => of(a));
  return concat(...seq);
};

export const concatActions = () => mergeMap(asyncConcat);

export const emptyAction = () => mergeMap(() => EMPTY);

export const notifySuccess = (action: Action<string, any>) => {
  if (action.meta?.resolve) {
    action.meta.resolve();
  }
};

export const notifyFail = (action: Action<string, any>, message = '') => {
  if (action.meta) {
    action.meta.error = {
      message,
    };
  }
};
