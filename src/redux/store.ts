import { combineReducers, configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const reducers = combineReducers({
	...rootReducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;
