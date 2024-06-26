import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./features/cart/cartSlice";
import ordersReducer from "./features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    cartState: CartReducer,
    orders: ordersReducer,
  },
});
