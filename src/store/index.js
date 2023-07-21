import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import courseReducer from './slices/courseDay'

export const store = configureStore({
    reducer: {
        user: userReducer,
        day:courseReducer,
    }
});