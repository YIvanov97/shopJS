import React, {useContext} from 'react'
import {API, UserContext} from './globalParams'
import './styles/cart.scss'
import {FaTrashAlt} from 'react-icons/fa'

const Cart = () => {
    
    const {user, setUser} = useContext(UserContext)

    const removeFromCart = (userId, product) => {
        fetch(`${API}/cart/remove`, {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json'
              },
            body: JSON.stringify([userId, product])
        })
        .then(() => window.location = '/cart')
        .catch(error => console.log(error))
    }

    const removeFromContextCart = (product) => {
        const updatedCart = user.cart.filter(item => item !== product);
        setUser(oldState => ({
            ...oldState,
            cart: [
                updatedCart
            ]
        }))
    }

    return (
        <>
            <div className="custom-shape-divider-top-1619184532">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-16191845323">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-161918453234">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
            <header>
                <h3>Cart</h3>
            </header>
            <main className="cart--Container">
                {user.cart?.map(product => {
                    return(
                        <div className="product--Container">
                            <img src={product.imageUrl} alt="product image" />
                            <div className="product--About--Container">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}$</p>
                            </div>
                            <div className="remove--Button--Container">
                                <FaTrashAlt /> 
                                <button className="remove--Button" onClick={() => {removeFromCart(user._id, product); setUser(removeFromContextCart(product))}}> REMOVE</button>
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    )
}

export default Cart;