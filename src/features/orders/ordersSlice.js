import { createSlice } from "@reduxjs/toolkit";

// Load orders from local storage
const loadOrdersFromLocal = () => {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: loadOrdersFromLocal(),
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state));
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
