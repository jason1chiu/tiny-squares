import React from 'react';
import '../css/store.css';
import ProductCard from '../js/ProductsCard'
import { Grid, GridItem, Center, Text } from '@chakra-ui/react'
import { productsArray } from '../js/ProductsStore'

const Store = () => {
  return (
    <div className="parent">
      <Center><Text fontSize='6xl'>Welcome to the Tiny Squares Store!</Text></Center>

     
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>


          {productsArray.map((product, id) => (
            <GridItem w='100%' h='10' key={id}>
              <ProductCard product={product} />
            </GridItem>
          ))}

        </Grid>
    
    </div>

  )
}

export default Store;