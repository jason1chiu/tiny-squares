import React from 'react';
import { CartContext } from "./CartContext"
import { useContext } from 'react';
import { getProductData } from './ProductsStore';
import { Button, Text, Image } from '@chakra-ui/react'

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <Image src={productData.img} alt="product" boxSize='150px' objectFit='cover'></Image>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button colorScheme='red' onClick={() => cart.deleteFromCart(id)}><Text fontSize='xs'>Remove</Text></Button>
      <hr></hr>
    </>
  )
}

export default CartProduct;