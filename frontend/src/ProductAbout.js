import React, { useEffect, useState, useContext } from 'react'
import {UserContext, API} from './globalParams'
import './styles/details.scss'
import { FaShoppingCart, FaCartArrowDown } from 'react-icons/fa'

const ProductAbout = (props) => {
    const [user, setUser, addToCart, setChosenImage] = useContext(UserContext);
    const [product, setProduct] = useState({})
    const [color, setColor] = useState([]);
    const localCart = JSON.parse(localStorage.getItem("cart"));

    console.log(product, '123')
    
    const productId = props.match.params.id
    
    useEffect(() => {
        fetch (`${API}/products/details/${productId}`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            console.log(response, 'asd')
            setProduct(response)
        })
        .catch (error => {
            console.error (error);
        })
    }, [])

    const reloadPage = () => {
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
    }

    const ParsedColors = () => {
        return(
            product.color.map(col => {
                const parsed = JSON.parse(col)
                return(
                    <button name="color" value={parsed.value} style={{backgroundColor: `${parsed.value}`}} onClick={() => colorPicker([product._id, parsed.value])}/>
                )
            })
        )
    }

    const colorPicker = ([productId, colors]) => {
        setColor([productId, colors])
    }

    const RenderProductImage = () => {
        return(
            product.imageFile?.map(image => {
                if(image.originalname.includes(color[1].substring(1))) {
                    setChosenImage(image.originalname)
                    return (
                        <img src={require(`./styles/images/${image.originalname}`).default} alt="product img" />
                    )
                }
            })
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
                    {(color.length > 0 && color[0] === product._id) ?
                        <RenderProductImage />
                    :
                    <>
                        {product.imageFile.map(image => {
                            if(image.originalname.includes('def')) {
                                return (
                                    <img src={require(`./styles/images/${image.originalname}`).default} alt="product img" />
                                )
                            }
                        })}
                    </>
                    }
                </div>
                : <></>}
            <div className="product--Colors--Container">
                {product.name ? <ParsedColors /> : <></>}
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
                                <td>Processor</td>
                                <td>Ram</td>
                                <td>Storage</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.processor}</td>
                                <td>{product.ram}</td>
                                <td>{product.storage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div className="product--Buy--Container">
                <div className="product--Price">
                    <h3>{product.price} $</h3>
                </div>
                {!localStorage.hasOwnProperty("cart") ? 
                    <>
                        {!user.cart.some(item => item._id === product._id) ? 
                            <>
                                <button className="addToCart--Button--Container" onClick={() => {addToCart(user, product); reloadPage();}}>
                                    <FaShoppingCart size='25' /> ADD TO CART
                                </button>
                            </>
                            :
                            <>
                                <button className="addToCart--Button--Container">
                                    <FaCartArrowDown size='25' color='#1E718D'/>
                                </button>
                            </>
                        }
                    </>
                :
                    <>
                        {!localCart.some(item => item._id === product._id) ? 
                            <>
                                <button className="addToCart--Button--Container" onClick={() => {addToCart(user, product); reloadPage();}}>
                                    <FaShoppingCart size='25'/> ADD TO CART
                                </button>
                            </>
                            :
                            <>
                                <button className="addToCart--Button--Container">
                                    <FaCartArrowDown size='25' color='#1E718D'/>
                                </button>
                            </>
                        }
                    </>
                }
            </div>
            </div>
        </div>
        </>
    )
}

export default ProductAbout;