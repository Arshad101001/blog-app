import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'

configureStore
const store = configureStore({
    reducer: {
        authReducer
    }
});

export default store;