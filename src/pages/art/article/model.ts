import { Effect, Reducer } from 'umi';
import { queryArticleList, delArticle, updateArticle } from './service';

import { artDataList, articleList } from './data.d';

export interface StateType {
  list: artDataList[];
  info: Partial<articleList>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    delArticle: Effect;
    updateArt: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    Info: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'article',

  state: {
    list: [],
    info: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
    *delArticle({ payload }, { call, put }) {
      const response = yield call(delArticle, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    },
    *updateArt({ payload }, { call, put }) {
      const response = yield call(updateArticle, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    }
  },

  reducers: {
    queryList(state = { list: [], info: {} }, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    Info(state = { list: [], info: {} }, action) {
      console.log(action.payload)
      return {
        ...state,
        info: action.payload,
      };
    }
  },
};

export default Model;
