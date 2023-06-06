import React, { useState } from 'react';
import {CartContext} from 'views/admin/store/js/CartContext'
import { useContext } from 'react'
import { Button, ButtonGroup, Grid, GridItem, Image, Center, Stack } from '@chakra-ui/react'

function ProductCard(props) {   
  const product = props.product;
  const cart = useContext(CartContext);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);

    // Simulate an asynchronous operation, e.g., making an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    cart.addOneToCart(product.id);
    setAdding(false);
  };

  return (
    <div>
      <section>
      
        <Center fontSize="lg">{product.title}</Center>

        <Stack spacing={3}>
        <Center>${product.price}</Center>
       
        <Center>
          <Image src={product.img} alt="product" borderRadius='30'  objectFit='cover' boxSize="20rem"></Image>
        </Center>

          <Center>
            <Button onClick={handleAddToCart}>{adding ? 'Adding...' : "Add To Cart"}</Button>
          </Center>
        </Stack>
      </section>

    </div>

    
  )
}

export default ProductCard;