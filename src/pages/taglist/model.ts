import { Effect, Reducer } from 'umi';
import { queryTagList, addTag, delTag } from './service';

import { tagDataList, tag_list } from './data.d';

export interface tagStateType {
  list: tag_list[];
  info: Partial<tagDataList>;
}

export interface ModelType {
  namespace: string;
  state: tagStateType;
  effects: {
    getTagList: Effect;
    addTag: Effect;
    delTag: Effect;
  };
  reducers: {
    queryList: Reducer<tagStateType>;
    Info: Reducer<tagStateType>;
  };
}

const Model: ModelType = {
  namespace: 'taglist',

  state: {
    list: [],
    info: {}
  },

  effects: {
    *getTagList({ payload }, { call, put }) {
      const response = yield call(queryTagList, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
    *addTag({ payload }, { call, put }) {
      const response = yield call(addTag, payload);
      if(response && response.data) {
        yield put({
          type: 'Info',
          payload: response,
        });
      }
    },
    *delTag({ payload }, { call, put }) {
      const response = yield call(delTag, payload);
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
