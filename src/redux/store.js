import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './reducers/user/userThunk';
import { settingApi } from './reducers/settings/settingsThunk';
import { jobApi } from './reducers/jobs/jobThunk';
import { businessApi } from './reducers/businesses/businessThunk';
import {projectApi} from "./reducers/projects/projectThunk";
import { applyApi } from './reducers/apply/applyThunk';

import userReducer from './reducers/user/userReducer';
import settingReducer from './reducers/settings/settingsReducers';
import jobReducer from './reducers/jobs/jobReducer';
import businessReducer from './reducers/businesses/businessReducer';
import projectReducer from './reducers/projects/projectReducer';
import applyReducer from './reducers/apply/applyReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingReducer,
    jobs: jobReducer,
    businesses: businessReducer,
    project:projectReducer,
    apply:applyReducer,

    [userApi.reducerPath]: userApi.reducer,
    [userApi.reducerPath]: settingApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [applyApi.reducerPath]:applyApi.reducer
  },

  middleware: getdefaultMiddleware =>
    getdefaultMiddleware({
      serializableCheck: false,
    }).concat([userApi.middleware, settingApi.middleware, jobApi.middleware,businessApi.middleware,projectApi.middleware, applyApi.middleware]),
});
