import React from 'react';
import 'views/admin/store/css/store.css';
import ProductCard from 'views/admin/store/js/ProductsCard'

import { productsArray } from 'views/admin/store/js/ProductsStore'

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