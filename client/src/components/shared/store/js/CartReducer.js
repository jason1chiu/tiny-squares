export function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ONE':
            // Look for the item in the cart
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                // If item exists, increment the quantity
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                // If item doesn't exist, add to the cart
                return {
                    ...state,
                    cart: [...state.cart, { id: action.payload, quantity: 1 }],
                };
            }
        case 'REMOVE_ONE':
            // Look for the item in the cart
            const itemToRemove = state.cart.find(item => item.id === action.payload);
            if (itemToRemove) {
                // If item exists and the quantity is more than 1, decrement the quantity
                if (itemToRemove.quantity > 1) {
                    return {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                } else {
                    // If item exists and the quantity is 1, remove the item from the cart
                    return {
                        ...state,
                        cart: state.cart.filter(item => item.id !== action.payload),
                    };
                }
            }
            // If item doesn't exist, return the original state
            return state;
        case 'DELETE_ITEM':
            // Remove the item from the cart
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
}