import React, {useEffect, useState} from 'react';

export const UserContext = React.createContext({})
const UserProvider = UserContext.Provider;

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`${API}/auth/user`, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
        .then (response => response.json())
        .then (response => {
            setUser(response.user)
        })
        .catch (error => {
            console.error (error);
        });
    }, [setUser]) 

    const addToCart = (user, product) => {
        console.log(product, 'asd')
        fetch(`${API}/cart/usercart`, {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json'
            },
        body: JSON.stringify([user._id, product])
        })
        .then(() => setUser(oldState => ({...oldState, cart: [...oldState.cart, product]})))
        .then(() => {
            const itemToLocalCart = product;
            const copyCart = user.cart;
            copyCart.push(itemToLocalCart)
            console.log(JSON.stringify(copyCart), ' 123')
            localStorage.setItem("cart", JSON.stringify(copyCart))
        })
        .catch(error => console.log(error))
    }

     const removeFromCart = (user, product) => {
        fetch(`${API}/cart/remove`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([user._id, product])
        })
        .then(() => {
            const updatedCart = user.cart.filter((item) => item._id !== product._id);
            setUser(oldState => ({
                ...oldState,
                cart: updatedCart
            }));
        })
        .then(() => {
            const copyCart = user.cart;
            const updatedCart = copyCart.filter((item) => item._id !== product._id);
            localStorage.setItem("cart", JSON.stringify(updatedCart))
        })
        .catch((error) => console.log(error));
    };

    return (
        <UserProvider value={[user, setUser, addToCart, removeFromCart]}>
            {props.children}
        </UserProvider>
    )
}   

export default UserContextProvider;

export let API = 'http://localhost:5000';