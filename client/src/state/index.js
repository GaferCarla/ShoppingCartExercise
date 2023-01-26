
import { createSlice } from "@reduxjs/toolkit";


//Offcanvas start
const initialState = {
    //Offcanvas inactive until press boton cart
  isCartOpen: false,
    //Cart count items and list
    cart: [],
    count: [],
    items: [],
};


export const cartSlice = createSlice({
  
  name: "cart",
  initialState,

  //where we are created our actions and reducers
  reducers: {
    

    setItems: (state, action) => {
      state.items = action.payload;
    },




    //the next 2 actions gonna update the current state of the cart
    addToCart: (state, action) => {
        state.isCartOpen= !state.isCartOpen
        state.cart = [...state.cart, action.payload.item]
        

    },




    //Update version
    // addToCart: (state, action) => {
    //   const itemInCart = state.cart.find((item) => item.id === action.payload.id);
    //   if (itemInCart!==0) {
    //     state.isCartOpen= !state.isCartOpen;
    //     return null;
    //   } else {
    //     state.isCartOpen= !state.isCartOpen;
    //     state.cart = [...state.cart, action.payload.item];
    //     console.log("No estaba")
    //   }
    // },
      

    removeFromCart: (state, action) => {
      //Anytime we want to remove from the cart, we're going to filter out everything
      //or we're going to keep all the items that are not equal to the ID 
      //that we're passing
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
    },

    resetCart: (state, action) => {
      state.cart = [];
      state.count= [];
      state.items= [];
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id &&  item?.attributes?.instock > item.count) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    //Opent cart with press botton
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  resetCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;