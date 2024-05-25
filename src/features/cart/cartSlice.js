import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocal = () =>
  JSON.parse(localStorage.getItem("cart")) || defaultState;

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocal(),
  reducers: {
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((itm) => itm.cartID === product.cartID);
      item
        ? (item.quantity += product.quantity)
        : state.cartItems.push(product);
      state.numItemsInCart += parseInt(product.quantity);
      state.cartTotal += product.price * product.quantity;
      // invoke calculateTotals func here from the cartslice caseReducer
      cartSlice.caseReducers.calculateTotals(state);

      toast("Item added to the cart");
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((itm) => itm.cartID === cartID);
      state.cartItems = state.cartItems.filter((itm) => itm.cartID !== cartID);

      state.numItemsInCart -= parseInt(product.quantity);
      state.cartTotal -= product.price * product.quantity;

      cartSlice.caseReducers.calculateTotals(state);
      toast("Item removed from the cart");
    },
    editItem: (state, action) => {
      const { cartID, quantity } = action.payload;
      const product = state.cartItems.find((itm) => itm.cartID === cartID);
      state.numItemsInCart += quantity - product.quantity;
      state.cartTotal += product.price * (quantity - product.quantity);
      product.quantity = quantity;

      cartSlice.caseReducers.calculateTotals(state);
      toast("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { clearCart, addItem, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
