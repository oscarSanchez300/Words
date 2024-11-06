import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice } from './';
import { wordSlice } from "./word/wordSlice";

export const store = configureStore({

    reducer: {   
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        words: wordSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
      serializableCheck: false
    }),

});