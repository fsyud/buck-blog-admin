import { Effect, Reducer } from 'umi';
import { queryMessageList, delMessage, changeMessage, changeThirdMessage } from './service';

import { messageListItem, BasicListItemDataType } from './data.d';

export interface StateType {
  list: messageListItem[];
  info: Partial<BasicListItemDataType>;
  listCounts: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    changeMessage: Effect;
    changeThirdMessage: Effect;
    delMessage: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    Info: Reducer<StateType>;
    counts: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'messageSpace',

  state: {
    list: [],
    info: {},
    listCounts: 0
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMessageList, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });

        yield put({
          type: 'counts',
          payload: response.data.count || 0,
        });
      }
    },
    *changeMessage({ payload }, { call, put }) {
      const response = yield call(changeMessage, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    },
    *changeThirdMessage({ payload }, { call, put }) {
      const response = yield call(changeThirdMessage, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    },
    *delMessage({ payload }, { call, put }) {
      const response = yield call(delMessage, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state = { listCounts: 0, list: [], info: {} }, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    Info(state = { listCounts: 0, list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
    counts(state = { listCounts: 0, list: [], info: {} }, action) {
      return {
        ...state,
        listCounts: action.payload,
      };
    },
  },
};

export default Model;
