import { Effect, Reducer } from 'umi';
import { queryUserList, delUser } from './service';

import { ListItem, BasicListItemDataType} from './data.d';

export interface StateType {
  list: ListItem[];
  info: Partial<BasicListItemDataType>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    delete: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    dleteInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userBasicList',

  state: {
    list: [],
    info: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(delUser, payload);
      yield put({
        type: 'dleteInfo',
        payload: response
      });
    },
  },

  reducers: {
    queryList(state = { list: [], info: {} }, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    dleteInfo(state = { list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};

export default Model;
