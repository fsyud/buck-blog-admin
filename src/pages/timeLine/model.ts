import { Effect, Reducer } from 'umi';
import { queryTimeLine, addTimeLine, updateTimeTimeline, delTimeline } from './service';

import { timeListItem, BasicListItemDataType } from './data.d';

export interface StateType {
  list: timeListItem[];
  info: Partial<BasicListItemDataType>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    addLine: Effect;
    updateLine: Effect;
    delLine: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    Info: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'timeLineList',

  state: {
    list: [],
    info: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTimeLine, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
    *addLine({ payload }, { call, put }) {
      const response = yield call(addTimeLine, payload);
      if(response && response.data) {
        yield put({
          type: 'Info',
          payload: response,
        });
      }
    },
    *updateLine({ payload }, { call, put }) {
      const response = yield call(updateTimeTimeline, payload);
      if(response && response.data) {
        yield put({
          type: 'Info',
          payload: response,
        });
      }
    },
    *delLine({ payload }, { call, put }) {
      const response = yield call(delTimeline, payload);
      if(response && response.data) {
        yield put({
          type: 'Info',
          payload: response,
        });
      }
    },
  },

  reducers: {
    queryList(state = { list: [], info: {} }, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    Info(state = { list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};

export default Model;
