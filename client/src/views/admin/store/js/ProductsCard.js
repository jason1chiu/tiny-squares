import React from 'react';
import { CartContext } from './CartContext'
import { useContext } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function ProductCard(props) {   //props.productt is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  // const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items)

  return (
    <div>
      <section>
        <h2>{product.title}</h2>
        <h2>${product.price}</h2>

        <Button onClick={() => { cart.addOneToCart(product.id); console.log('click') }}>Add To Cart</Button>

      </section>
    </div>
  )
}

export default ProductCard;