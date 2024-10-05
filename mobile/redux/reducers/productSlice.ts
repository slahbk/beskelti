import { ip } from "@/constants/IpAdress";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
 async () => {
    const response = await axios(`${ip}/product`);
     return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error.message || "error fetching products";
    });
  },
});

export default productSlice.reducer;
