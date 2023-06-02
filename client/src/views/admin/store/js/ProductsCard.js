import React from 'react';
import {CartContext} from 'views/admin/store/js/CartContext'
import { useContext } from 'react'


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
     
                <button onClick={() => {cart.addOneToCart(product.id); console.log('click')}}>Add To Cart</button>
        
            </section>
        </div>
    )
}

export default ProductCard;