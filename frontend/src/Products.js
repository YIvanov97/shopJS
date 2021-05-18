import React, { useEffect, useState, useContext } from 'react'
import {UserContext, API} from './globalParams'
import './styles/products.scss'
import {FaSearch, FaHeart, FaShoppingCart, FaCartArrowDown} from 'react-icons/fa'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Badge } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {ProductContext} from './productContextProvider'

const Products = props => {

    const [user, setUser, addToCart] = useContext(UserContext);
    const {productData} = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const [color, setColor] = useState([]);
    const localCart = JSON.parse(localStorage.getItem("cart"));
    const animatedComponents = makeAnimated();

    const storageOptions = [
        {value: '512', label: '512 GB'},
        {value: '128', label: '128 GB'},
        {value: '256', label: '256 GB'},
        {value: '1 TB', label: '1 TB'},
    ]

    const ramOptions = [
        {value: '4', label: '4 GB'},
        {value: '8', label: '8 GB'},
        {value: '16', label: '16 GB'},
        {value: '32', label: '32 GB'},
        {value: '64', label: '64 GB'},
    ]

    const typeOptions = [
        {value: 'laptop', label: 'Laptops'},
        {value: 'phone', label: 'Phones'},
        {value: 'computer', label: 'Computers'},
        {value: 'tablet', label: 'Tablets'},
        {value: 'watch', label: 'Watches'}
    ]

    useEffect(() => {
        fetch (`${API}/products`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setProducts(response)
        })
        .catch (error => {
            console.error (error);
        });
    },[])

    const searchProduct = (e) => {
        e.preventDefault()
        fetch (`${API}/products?search=${e.target.search.value}&storage=${e.target.storage.value}&ram=${e.target.ram.value}&type=${e.target.type.value}`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setProducts(response)
        })
        .catch (error => {
            console.error (error);
        });
    }

    const reloadProducts = () => {
        fetch (`${API}/products`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setProducts(response)
        })
        .catch (error => {
            console.error (error);
        });
    }

    const productLike = (productId, userEmail) => {
        fetch(`${API}/products/like`, {
          method:"POST",
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([productId, userEmail])
        })
        .then(() => reloadProducts())
        .catch(error => console.log(error))
    }

    const productDislike = (productId, userEmail) => {
        fetch(`${API}/products/dislike`, {
            method:"POST",
            headers: { 
                'Content-Type': 'application/json'
              },
            body: JSON.stringify([productId, userEmail])
        })
        .then(() => reloadProducts())
        .catch(error => console.log(error))
    }

    const ParsedColors = props => {
        return(
            props.product.color.map(col => {
                const parsed = JSON.parse(col)
                return(
                    <button name="color" value={parsed.value} style={{backgroundColor: `${parsed.value}`}} onClick={() => colorPicker([props.product._id, parsed.value])}/>
                )
            })
        )
    }

    const colorPicker = ([productId, colors]) => {
        setColor([productId, colors])
    }

    const RenderProductImage = (props) => {
        return(
            props.product.imageFile?.map(image => {
                if(image.originalname.includes(color[1].substring(1))) {
                    return (
                        <img src={require(`./styles/images/${image.originalname}`).default} alt="product img" />
                    )
                }
            })
        )
    }

    // const productAbout = (id) => {
    //     fetch (`${API}/products/details/${id}`, {
    //         method: 'GET',
    //     })
    //     .then (response => response.json ())
    //     //.then (response => {
    //     //    setProduct(response)
    //     //})
    //     .then(response => window.location =`/details/${response._id}`)
    //     .catch (error => {
    //         console.error (error);
    //     });
    // }
    
    return(
        <div className="products--Container">
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
            <header>
                <h1>Feel the comfort at your workplace</h1>
                <h3>Feel the comfort in your hands</h3>
            </header>
            <main className="products--Table--Container">
                <>
                {products.lenght === 0 ? 
                    <></> 
                    :
                    <>
                        <form className="product--SearchForm" onSubmit={searchProduct}>
                            <input type="text" className="product--Search" name="search" placeholder="Search..."/>
                            <Select
                            className="product--Filter"
                            name="storage"
                            placeholder="Storage"
                            options={storageOptions}
                            components={animatedComponents}
                            isClearable={true}
                            />
                            <Select
                            className="product--Filter"
                            name="ram"
                            placeholder="Ram"
                            options={ramOptions}
                            components={animatedComponents}
                            isClearable={true}
                            />
                            <Select
                            className="product--Filter"
                            name="type"
                            placeholder="Type"
                            options={typeOptions}
                            isClearable={true}
                            />   
                            <div className="search--Button--Container">
                                <FaSearch color={'#1E718D'}/>
                                <input type="submit" value="Search"/>
                            </div>
                        </form>
                        <div className="products--Section">
                            {products.map(product => {     
                                return(
                                    <div className="product--Container" key={product._id}>
                                        <div className="product--TopButton--Container">
                                            <button className="about--Button" onClick={() => productData(product._id)}>About</button>
                                        </div>
                                        <div className="product--Image--Container">
                                            {(color.length > 0 && color[0] === product._id) ?
                                                <RenderProductImage product={product} />
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
                                        <div className="product--Colors--Container">
                                            <ParsedColors product={product}/>
                                        </div>
                                        <div className="product--About--Container">
                                            <h3>{product.name}</h3>
                                            <p>{product.price}$</p>
                                        </div>
                                        <div className="product--BottomButtons--Container">
                                            {user.email ?
                                                <> 
                                                    {!product.likes.includes(user.email) ? 
                                                        <>
                                                            <Badge badgeContent={product.likes.length} showZero color="secondary" anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
                                                                <button className="addTo--Favourite--Button--Container">
                                                                    <FaHeart size='25' className="heart--Button" onClick={() => productLike(product._id, user.email)}/>
                                                                </button>
                                                            </Badge>
                                                        </>
                                                        : 
                                                        <>
                                                            <Badge badgeContent={product.likes.length} showZero color="secondary" anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
                                                                <button className="addTo--Favourite--Button--Container">
                                                                    <FaHeart size='25' color='#FFA0F7' className="heart--Button" onClick={() => productDislike(product._id, user.email)}/>
                                                                </button>
                                                            </Badge>
                                                        </>
                                                    }
                                                    {!localStorage.hasOwnProperty("cart") ? 
                                                        <>
                                                            {!user.cart.some(item => item._id === product._id) ? 
                                                                <>
                                                                    <button className="addTo--Cart--Button--Container" onClick={() => {addToCart(user, product); reloadProducts()}}>
                                                                        <FaShoppingCart size='25' /> ADD TO CART
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <Popup trigger={
                                                                        <button className="addTo--Cart--Button--Container">
                                                                            <FaCartArrowDown size='25' color='#1E718D'/> ADD TO CART
                                                                        </button>
                                                                    }
                                                                    position="top right"
                                                                    on="hover"
                                                                    className="popup--Added"
                                                                    >
                                                                        <span>Product already added to cart.</span>
                                                                    </Popup>
                                                                </>
                                                            }
                                                        </>
                                                    :
                                                        <>
                                                            {!localCart.some(item => item._id === product._id) ? 
                                                                <>
                                                                    <button className="addTo--Cart--Button--Container" onClick={() => {addToCart(user, product); reloadProducts()}}>
                                                                        <FaShoppingCart size='25'/> ADD TO CART
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <Popup trigger={
                                                                        <button className="addTo--Cart--Button--Container">
                                                                            <FaCartArrowDown size='25' color='#1E718D'/> ADD TO CART
                                                                        </button>
                                                                    }
                                                                    position="top right"
                                                                    on="hover"
                                                                    className="popup--Added"
                                                                    >
                                                                        <span>Product already added to cart.</span>
                                                                    </Popup>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>   
                                                :
                                                <>
                                                    <Popup trigger={
                                                        <Badge badgeContent={product.likes.length} showZero color="secondary" anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
                                                            <button className="addTo--Favourite--Button--Container">
                                                                <FaHeart size='25' className="heart--Button" />
                                                            </button>
                                                        </Badge>
                                                    }
                                                    position="top left"
                                                    on="hover"
                                                    >
                                                        <span>Login to like this product.</span>
                                                    </Popup>
                                                </>
                                            }
                                        </div>    
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
                </>
            </main>
        </div>
    )    
}

export default Products;