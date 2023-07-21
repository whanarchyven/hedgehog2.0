import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    day: null,
};

const courseDaySlice= createSlice({
    name: 'course',
    initialState,
    reducers: {
        setDay(state, action) {
            state.day = action.payload.day;
        },
        removeDay(state) {
            state.day = null;
        },
    },
});

export const {setDay, removeDay} = courseDaySlice.actions;

export default courseDaySlice.reducer;
