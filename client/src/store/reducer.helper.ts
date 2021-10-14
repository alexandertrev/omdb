/* eslint-disable indent */
import { Reducer, Action } from 'redux';
import _ from 'lodash';

import { RequestState } from './schema';

export interface ReducerActions<T, V> {
  [actionType: string]: (state: T, payload: V) => T;
}

export interface APIActionsHandlers<T, V> {
  [actionType: string]: (state: T, thunkState: RequestState, payload?: V) => T;
}

type AsyncFunction = () => Promise<any>;

type AsyncPayload = Promise<any> | AsyncFunction | Record<any, any>;

export interface IAsyncAction extends Action {
  payload?: AsyncPayload;
}

export enum APIActionSuffix {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export const buildRequestStartedActionType = (actionType: string): string =>
  `${actionType}_${APIActionSuffix.PENDING}`;

export const buildRequestSucceededActionType = (actionType: string): string =>
  `${actionType}_${APIActionSuffix.FULFILLED}`;

export const buildRequestFailedActionType = (actionType: string): string =>
  `${actionType}_${APIActionSuffix.REJECTED}`;

export const addAPIActionHandlers = <T, V>(
  reducerActions: ReducerActions<T, V>,
  actionHandlers: APIActionsHandlers<T, V>,
) =>
  _.forOwn(actionHandlers, (handler, actionType: string) => {
    reducerActions[buildRequestStartedActionType(actionType)] = (state) =>
      handler(state, { inProcess: true, error: false });

    reducerActions[buildRequestSucceededActionType(actionType)] = (state, payload) =>
      handler(state, { inProcess: false, error: false }, payload);

    reducerActions[buildRequestFailedActionType(actionType)] = (state) =>
      handler(state, { inProcess: false, error: false });
  });

export const createReducer = <T, V>(
  INITIAL_STATE: T,
  reducerActions: ReducerActions<T, V>,
): Reducer<T> => (state = INITIAL_STATE, { type, payload }) => {
  if (type in reducerActions) {
    return reducerActions[type](state, payload);
  }
  return state;
};
