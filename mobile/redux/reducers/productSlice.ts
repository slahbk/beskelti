import { IP_ADDRESS } from "@/constants/ApiConfig";
import { useFetchProduct } from "@/hooks/useFetchProduct";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  useFetchProduct
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
