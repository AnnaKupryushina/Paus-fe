import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState: any[] = [];

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, { payload }) => payload,
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = createSelector(
	(state: RootState) => state,
	(state) => state
);
