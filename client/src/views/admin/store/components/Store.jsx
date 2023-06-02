import React from 'react';
import '../css/store.css';
import ProductCard from '../js/ProductsCard'
import { Grid, GridItem, Center, Text } from '@chakra-ui/react'
import { productsArray } from '../js/ProductsStore'

const Store = () => {
  return (
    <div className="parent">
      <Center><Text fontSize='5xl'>Welcome to our store!</Text></Center>

      <div className="centered">
        <section className="cards">

    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
  <GridItem w='100%' h='10' bg='blue.500' />
  <GridItem w='100%' h='10' bg='blue.500' />
  <GridItem w='100%' h='10' bg='blue.500' />
</Grid>
          {productsArray.map((product, id) => (
            <article className="card product-under" key={id}>
              <ProductCard product={product} />
            </article>
          ))}

        </section>
      </div>
    </div>

  )
}

export default Store;