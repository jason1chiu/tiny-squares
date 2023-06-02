import React from 'react';
import { CartContext } from "./CartContext"
import { useContext } from 'react';
import { getProductData } from './ProductsStore';

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <button onClick={() => cart.deleteFromCart(id)}>Remove</button>
      <hr></hr>
    </>
  )
}

export default CartProduct;