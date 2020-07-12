import { Effect, Reducer } from 'umi';
import { queryProjectList, addProject, delProject, updateProject } from './service';

import { ProjectList, Project} from './data.d';

export interface StateType {
  list: ProjectList[];
  info: Partial<Project>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    delete: Effect;
    update: Effect;
    addproject: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    Info: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'projectModel',

  state: {
    list: [],
    info: {}
  },

  effects: {
    *fetch({ _ }, { call, put }) {
      const response = yield call(queryProjectList);
      if(response && response.data) {
        yield put({
          type: 'queryList',
          payload: response.data.list || [],
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(delProject, payload);
      yield put({
        type: 'Info',
        payload: response
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateProject, payload);
      yield put({
        type: 'Info',
        payload: response
      });
    },
    *addproject({ payload }, { call, put }) {
      const response = yield call(addProject, payload);
      yield put({
        type: 'Info',
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
    Info(state = { list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};

export default Model;
