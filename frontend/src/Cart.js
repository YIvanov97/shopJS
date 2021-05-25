import React, {useContext, useEffect, useState} from 'react'
import {API, UserContext} from './globalParams'
import './styles/cart.scss'
import {FaTrashAlt} from 'react-icons/fa'


const Cart = props => {
    
    const [user, setUser, addToCart, removeFromCart] = useContext(UserContext)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if(localStorage.hasOwnProperty("cart") && removeFromCart) {
            let getCart = localStorage.getItem("cart")
            try {
                getCart = JSON.parse(getCart)
                setCart(getCart)
            } catch (e) {
                setCart([])
            }
        }
    }, [setCart])

    console.log(cart,'123')

    return (
        <>
            <div className="custom-shape-divider-top-1619781157">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781158">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781159">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <header>
                <h3>Cart</h3>
            </header>
            <main className="cart--Container">
                <table>
                    <tbody>
                        {!cart ? 
                                <>
                                    {user.cart.map(product => {
                                        return (
                                            
                                                <tr>   
                                                    <td>{product.name}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}$</td>
                                                    <td>
                                                        <button className="remove--Button--Container" onClick={() => removeFromCart(user, product)}>
                                                            <FaTrashAlt size="25" /> 
                                                        </button>
                                                    </td>
                                                </tr>
                                            
                                        )
                                    })}
                                </>
                            :
                                <>
                                    {cart.map(product => {
                                        return (
                                        
                                            <tr>   
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}$</td>
                                                <td>
                                                    <button className="remove--Button--Container" onClick={() => removeFromCart(user, product)}>
                                                        <FaTrashAlt size="25" /> 
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                        )
                                    })}
                                </>
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Cart;