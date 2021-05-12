export const ADD_PRODUCT = 'ADD_PRODUCT'

const API = 'http://localhost:5000';

const addToCart = (user, product) => {
            fetch(`${API}/cart/usercart`, {
                method:"POST",
                headers: { 
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify([user._id, product])
        })
        .then(() => {
            const updatedCart = [...user.cart]
            const updatedItemIndex = updatedCart.findIndex(item => item._id === product._id)

            console.log(updatedCart, '1')
            console.log(updatedItemIndex, '2')
            
            if(updatedItemIndex < 0) {
                updatedCart.push(product)
                console.log(updatedCart, '3')
            } else {
                const updatedItem = {
                    ...updatedCart[updatedItemIndex]
                }
                updatedCart[updatedItemIndex] = updatedItem
                console.log(updatedCart, '4')
            }

            return { ...user, cart: updatedCart };
        })
        .catch(error => console.log(error))
    }

export const shopReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return addToCart(state, action.product)
            break;
    
        default:
            return state;
            break;
    }
}