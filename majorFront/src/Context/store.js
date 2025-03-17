import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './backendapi.js'

export const store= configureStore({
    reducer: apiReducer
})