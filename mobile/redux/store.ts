import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./reducers/productSlice";
import { userSlice } from "./reducers/userSlice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        user: userSlice.reducer
    },
});