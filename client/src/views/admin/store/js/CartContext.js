import React, { createContext, useState} from "react";
import {productsArray, getProductData } from "views/admin/store/js/ProductsStore"

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1,
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id 
                    ? {...product, quantity: product.quantity + 1} : product
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id 
                    ? {...product, quantity: product.quantity - 1} : product
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })
        )
    }

    // function getTotalCost() {
    //     let totalCost = 0;
    //     cartProducts.map((cartItem) => {
    //         const productData = getProductData(cartItem.id);
    //         totalCost += (productData.price * cartItem.quantity);
    //     })
    //     return totalCost;
    // }

    function getTotalCost() {
        return cartProducts.reduce((totalCost, cartItem) => {
          const productData = getProductData(cartItem.id);
          return totalCost + productData.price * cartItem.quantity;
        }, 0);
      }
      

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;