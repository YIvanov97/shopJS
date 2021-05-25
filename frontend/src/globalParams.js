import React, {useEffect, useState} from 'react';

export const UserContext = React.createContext({})
const UserProvider = UserContext.Provider;

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [chosenImage, setChosenImage] = useState('');

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

        const cartProduct = {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            type: product.type,
            likes: product.likes,
            color: product.color,
            imageFile: chosenImage
        }

        console.log(cartProduct)

        fetch(`${API}/cart/usercart`, {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json'
            },
        body: JSON.stringify([user._id, product])
        })
        .then(response => response.json())
        .then(response => {
            const updatedCart = response.cart;
            setUser(oldState => ({...oldState, cart: [updatedCart]}))
            localStorage.setItem("cart", JSON.stringify(updatedCart))
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
        .then(response => response.json())
        .then(response => {
            const updatedCart = response.removeProduct.cart;
            setUser(oldState => ({...oldState, cart: [updatedCart]}));
            localStorage.setItem("cart", JSON.stringify(updatedCart))
        })
        .catch((error) => console.log(error));
    };

    return (
        <UserProvider value={[user, setUser, addToCart, removeFromCart, setChosenImage]}>
            {props.children}
        </UserProvider>
    )
}   

export default UserContextProvider;

export let API = 'http://localhost:5000';