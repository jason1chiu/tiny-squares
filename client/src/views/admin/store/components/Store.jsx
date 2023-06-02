import React from 'react';
import '../css/store.css';
import ProductCard from '../js/ProductsCard'

import { productsArray } from '../js/ProductsStore'

const Store = () => {
    return (
    
    
        <div className="parent">
            <h1 className="test">Welcome to our store</h1>

            <div className="centered">
                <section className="cards">

                    {productsArray.map((product, id) => (
                    <article className="card product-under" key={id}>
                        <ProductCard product={product}/>
                    </article>
                    ))}

                </section>

            </div>
        </div>
    
    )
}

export default Store;