import React, { useEffect, useState, useContext } from 'react'
import {UserContext, API} from './globalParams'
import './styles/details.scss'
import './styles/responsive/responsiveDetails.scss'
import { FaShoppingCart, FaCartArrowDown } from 'react-icons/fa'
import { motion } from "framer-motion"

const ProductAbout = (props) => {
    const [user, setUser, setAddToCart, removeFromCart, setChosenImage] = useContext(UserContext);
    const [product, setProduct] = useState({})
    const [imageIndex, setImageIndex] = useState(0);
    const localCart = JSON.parse(localStorage.getItem("cart"));
    const productId = props.match.params.id
    
    useEffect(() => {
        fetch (`${API}/products/details/${productId}`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setProduct(response)
        })
        .catch (error => {
            console.error (error);
        })
    }, [productId])

    const reloadPage = () => {
        fetch (`${API}/products/details/${productId}`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setTimeout(() => {
                setProduct(response)
            }, 100)
        })
        .catch (error => {
            console.error (error);
        })
    }

    const ParsedColors = props => {
        return(
            <ul>
                {props.product.colors.map((color, i) => {
                    return(
                        <li key={i}>
                            <motion.button
                                key={i}
                                style={{backgroundColor: color}}
                                className="color--Button"
                                whileHover={{ scale: 1.2 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setImageIndex(i)}
                            />
                        </li>
                    )
                })}
            </ul>
        )
    }

    const RenderProductImage = (props) => {
        return(
            <>
            {props.product.images[imageIndex] ? 
                <>
                    <img key={props.product._id + imageIndex} src={require(`./styles/images/${props.product.images[imageIndex].originalname}`).default} alt="product img" />
                </>  
                :
                <></>
            }
            </>
        )
    }
   
    return(
        <>
        <div className="custom-shape-divider-top-1619781110">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className="custom-shape-divider-top-1619781111">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className="custom-shape-divider-top-1619781112">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className="product--Details--Container">
            <div className="product--ImageColors--Container">
                {product.name ?
                <div className="product--Image--Container">
                    <RenderProductImage product={product}/>
                </div>
                : <></>}
            <div className="product--Colors--Container">
                {product.name ? <ParsedColors product={product}/> : <></>}
            </div>
            </div>
            <div className="product--Details--Info">
                <div className="product--Info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>Specifications</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>CPU</td>
                                <td>RAM</td>
                                <td>Storage</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.processor}</td>
                                <td>{product.ram}GB</td>
                                <td>{product.storage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div className="product--Buy--Container">
                <div className="product--Price">
                    <h3>{product.price} $</h3>
                </div>
                {user.email ? 
                    <>
                        {!localStorage.hasOwnProperty("cart") ? 
                            <>
                                {!user.cart?.some(item => item._id === product._id) ? 
                                    <>
                                        <button className="addToCart--Button--Container" onClick={() => {setChosenImage(product.images[imageIndex]); setAddToCart([user, product]); reloadPage();}}>
                                            <FaShoppingCart size='25' /> <p>ADD TO CART</p>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="addToCart--Icon--Container">
                                            <FaCartArrowDown size='35' color='#40D000'/>
                                        </button>
                                    </>
                                }
                            </>
                        :
                            <>
                                {!localCart.some(item => item._id === product._id) ? 
                                    <>
                                        <button className="addToCart--Button--Container" onClick={() => {setChosenImage(product.images[imageIndex]); setAddToCart([user, product]); reloadPage();}}>
                                            <FaShoppingCart size='25'/> <p>ADD TO CART</p>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="addToCart--Icon--Container">
                                            <FaCartArrowDown size='35' color='#40D000'/>
                                        </button>
                                    </>
                                }
                            </>
                        }
                    </>
                :
                    <></>
                }
            </div>
            </div>
        </div>
        </>
    )
}

export default ProductAbout;