import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  amount: 0,
  shipping: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Product removed from the cart!');
    },
    updateCartAmount: (state, action) => {
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let total = 0;
      state.cartItems.forEach(item => {
        total += item.price;
      });
      state.total = total;
    },
    addToCart: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (!cartItem) {
        state.cartItems.push({ ...action.payload, amount: 1 });
      } else {
        cartItem.amount += action.payload.amount;
      }
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Product added to the cart!');
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    }
  }
});

// Export actions
export const { clearCart, removeItem, updateCartAmount, calculateTotals, addToCart, setShipping } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
