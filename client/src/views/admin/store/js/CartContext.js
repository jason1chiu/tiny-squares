import React, { createContext, useReducer } from "react";
import { productsArray, getProductData } from "views/admin/store/js/ProductsStore"
import { cartReducer } from "views/admin/store/js/CartReducer";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  function addOneToCart(id) {
    dispatch({ type: 'ADD_ONE', payload: id });
  }

  function removeOneFromCart(id) {
    dispatch({ type: 'REMOVE_ONE', payload: id });
  }

  function deleteFromCart(id) {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }

  function getProductQuantity(id) {
    const product = state.cart.find(item => item.id === id);
    return product ? product.quantity : 0;
  }

  function getTotalCost() {
    return state.cart.reduce((totalCost, cartItem) => {
      const productData = getProductData(cartItem.id);
      return totalCost + productData.price * cartItem.quantity;
    }, 0);
  }

  function getTotalQuantity() {
    return state.cart.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity;
    }, 0);
  }

  return (
    <CartContext.Provider value={{
      cart: state.cart,
      getProductQuantity,
      addOneToCart,
      removeOneFromCart,
      deleteFromCart,
      getTotalCost,
      getTotalQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}