import React, {useEffect, useState} from 'react';

export const UserContext = React.createContext({})
const UserProvider = UserContext.Provider;

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [chosenImage, setChosenImage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [addToCart, setAddToCart] = useState([])

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

    const updateUser = (e) => {
        e.preventDefault();
        const data = {
            _id: user._id,
            name: e.target.name.value,
            username: e.target.username.value,
        }

        fetch(`${API}/auth/user`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            const updatedName = response.name;
            const updatedUsername = response.username;
            setUser(oldState => ({...oldState, name: updatedName, username: updatedUsername}))
            localStorage.setItem('profile', JSON.stringify([updatedName, updatedUsername]))
            setDisabled(false)
        })
        .then(() => window.location = '/profile')
        .catch(error => console.log(error))
    }

    useEffect(() => {

        const cartProduct = {
            _id: addToCart[1]?._id,
            name: addToCart[1]?.name,
            description: addToCart[1]?.description,
            processor: addToCart[1]?.processor,
            ram: addToCart[1]?.ram,
            storage: addToCart[1]?.storage,
            price: addToCart[1]?.price,
            type: addToCart[1]?.type,
            likes: addToCart[1]?.likes,
            colors: addToCart[1]?.colors,
            images: chosenImage.originalname
        }

        fetch(`${API}/cart/usercart`, {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([user._id, cartProduct])
            })
            .then(response => response.json())
            .then(response => {
                const updatedCart = response.cart;
                setUser(oldState => ({...oldState, cart: [updatedCart]}))
                localStorage.setItem("cart", JSON.stringify(updatedCart))
            })
            .catch(error => console.log(error)) 
    
    }, [addToCart, chosenImage])


     const removeFromCart = (user, product) => {
        fetch(`${API}/cart/remove`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([user._id, product])
        })
        .then(response => response.json())
        .then(response =>{
            const updatedCart = response.removeProduct.cart;
            setUser(oldState => ({...oldState, cart: [updatedCart]}));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        })
        .then(() => window.location = '/cart')
        .catch((error) => console.log(error));
    };


    return (
        <UserProvider value={[user, setUser, setAddToCart, removeFromCart, setChosenImage, updateUser, disabled, setDisabled]}>
            {props.children}
        </UserProvider>
    )
}   

export default UserContextProvider;

export let API = 'http://localhost:5000';