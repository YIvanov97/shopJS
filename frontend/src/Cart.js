import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from './globalParams'
import './styles/cart.scss'
import {FaTrashAlt} from 'react-icons/fa'
import { HiOutlineEmojiSad } from "react-icons/hi";
import { motion } from 'framer-motion'


const Cart = props => {
    
    const [user, setUser, addToCart, removeFromCart] = useContext(UserContext)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if(localStorage.hasOwnProperty("cart")) {
            let getCart = localStorage.getItem("cart")
            try {
                getCart = JSON.parse(getCart)
                setCart(getCart)
            } catch (e) {
                setCart([])
            }
        }
    }, [setCart])


    return (
        <>
            <div className="custom-shape-divider-top-1619781127">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781128">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781129">
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
                        {!localStorage.hasOwnProperty("cart") ? 
                                <>
                                {user?.cart?.length > 0 ?
                                    <>
                                        {user.cart.map((product, i) => {
                                            return (
                                                <tr key={i}> 
                                                    <td><img alt="productimg" src={require(`./styles/images/${product.images}`).default}/></td>
                                                    <td>{product.name}</td>
                                                    <td>{product.processor} / {product.ram}GB / {product.storage}</td>
                                                    <td>{product.price}$</td>
                                                    <td>
                                                        <button className="remove--Button--Container" onClick={() => removeFromCart(user, product)}>
                                                            <motion.div whileHover={{scale: 1.2}}>
                                                                <FaTrashAlt size="25" /> 
                                                            </motion.div>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                :
                                    <div className="cart--Empty--Container">
                                        <h1><HiOutlineEmojiSad color="#1E718D" size="50"/> CART IS EMPTY</h1>
                                    </div>
                                }
                                </>
                            :
                                <>
                                    {cart.length > 0 ?
                                        <>
                                            {cart.map((product, i) => {
                                                return (
                                                    <tr key={i}>   
                                                        <td><img alt="productimg" src={require(`./styles/images/${product.images}`).default}/></td>
                                                        <td>{product.name}</td>
                                                        <td>{product.processor} / {product.ram}GB / {product.storage}</td>
                                                        <td>{product.price}$</td>
                                                        <td>
                                                            <button className="remove--Button--Container" onClick={() => removeFromCart(user, product)}>
                                                            <motion.div whileHover={{scale: 1.2}}>
                                                                <FaTrashAlt size="25" /> 
                                                            </motion.div>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                    :
                                        <div className="cart--Empty--Container">
                                            <h1><HiOutlineEmojiSad color="#1E718D" size="50"/> CART IS EMPTY</h1>
                                        </div>
                                    }
                            </>
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Cart;