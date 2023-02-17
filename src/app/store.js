import { configureStore } from "@reduxjs/toolkit";
import basketSliceReducer from "../views/basket/basketSlice";
export const store = configureStore({
    reducer:{
        basket: basketSliceReducer,
    }
})