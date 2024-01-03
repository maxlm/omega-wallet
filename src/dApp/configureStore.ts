import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epic';
import reducer, { AppState } from './reducer';
import { DependencyContainer } from './dependencies';

export type StoreConfigurationParams = {
  dependencies: DependencyContainer;
  initialState?: Partial<AppState>;
};
export function configureStore({ dependencies, initialState = {} }: StoreConfigurationParams) {
  const epicMiddleware = createEpicMiddleware({
    dependencies,
  });

  const enhancer = compose(applyMiddleware(epicMiddleware));

  const store = createStore(reducer, initialState, enhancer);

  return {
    ...store,
    runSideEffects: () => epicMiddleware.run(rootEpic),
  };
}
