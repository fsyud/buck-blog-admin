import { Effect, Reducer } from 'umi';
import { queryTagList } from '@/services/tag';

import { tag_list } from './common.d';

export interface tagStateType {
  tagList: tag_list[];
}

export interface tagModelType {
  namespace: string;
  state: tagStateType;
  effects: {
    getTagList: Effect;
  };
  reducers: {
    queryList: Reducer<tagStateType>;
  };
}

const tagModel: tagModelType = {
  namespace: 'tags',

  state: {
    tagList: [],
  },

  effects: {
    *getTagList({ payload }, { call, put }) {
      const response = yield call(queryTagList, payload);
      if(response && response.data && response.data.list) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        tagList: action.payload,
      };
    },
  },
}

export default tagModel;
