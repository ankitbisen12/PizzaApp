import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      //updating total Amount when adding new item
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      //check if item exist
      //find index
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      state.items = updatedItems;
    },
    removeItem: (state, action) => {
      // console.log("Payload", action.payload);
      const existingCartItemIndex = state.items.findIndex(
        // (item) => item.id === action.id
        (item) => {
          // console.log(item.id);
          return item.id === action.payload;
        }
      );
      // console.log(existingCartItemIndex);
      const existingItem = state.items[existingCartItemIndex];
      // console.log(existingItem);
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      // console.log("updatedTotalAmount", updatedTotalAmount);

      let updatedItems;
      // console.log(existingItem.amount);
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
