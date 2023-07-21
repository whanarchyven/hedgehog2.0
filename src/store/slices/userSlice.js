import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    access: null,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.access = action.payload.access;
            state.user = action.payload.user;
        },
        removeUser(state) {
            state.access = null;
            state.user = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
