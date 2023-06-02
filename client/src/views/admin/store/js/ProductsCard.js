import React from 'react';
import {CartContext} from 'views/admin/store/js/CartContext'
import { useContext } from 'react'
import { Button, ButtonGroup, Grid, GridItem, Image, Center, Stack } from '@chakra-ui/react'

function ProductCard(props) {   //props.productt is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  // const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items)

  return (
    <div>
      <section>
      
        <Center fontSize="lg">{product.title}</Center>

        <Stack spacing={3}>
        <Center>${product.price}</Center>
       
        <Center>
          <Image src={product.img} alt="product" borderRadius='30'  objectFit='cover' boxSize="350px"></Image>
        </Center>

          <Center>
            <Button onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
          </Center>
        </Stack>
      </section>

    </div>

    
  )
}

export default ProductCard;