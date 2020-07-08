import { Effect, Reducer } from 'umi';
import { addArticle } from './service';

import { articleDetailist } from './data.d';

export interface StateType {
  list: Partial<articleDetailist>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    addArticle: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'createArticleModel',

  state: {
    list: {},
  },

  effects: {
    *addArticle({ payload }, { call, put }) {
      const response = yield call(addArticle, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
}

export default Model;
