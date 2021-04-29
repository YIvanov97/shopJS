import React, { useEffect, useState, useContext } from 'react'
import {UserContext, API} from './globalParams'
import './styles/products.scss'
import {FaSearch, FaHeart, FaShoppingCart} from 'react-icons/fa'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Badge } from '@material-ui/core';

const Products = () => {

    const {user, setUser} = useContext(UserContext)

    const [products, setProducts] = useState([])

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

    const addToCart = (userId, product) => {
        fetch(`${API}/cart/usercart`, {
          method:"POST",
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([userId, product])
        })
        .then(() => reloadProducts())
        .catch(error => console.log(error))
    }

    return(
        <div className="products--Container">
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
                                    <div className="product--Container">
                                        <div className="product--TopButtons--Container">
                                        {!product.likes.includes(user.email) ? 
                                            <>
                                                <Badge badgeContent={product.likes.length} showZero color="secondary">
                                                    <button className="addTo--Favourite--Button--Container">
                                                        <FaHeart className="heart--Button" onClick={() => productLike(product._id, user.email)}/>
                                                    </button>
                                                </Badge>
                                            </>
                                            : 
                                            <>
                                                <Badge badgeContent={product.likes.length} showZero color="secondary">
                                                    <button className="addTo--Favourite--Button--Container">
                                                        <FaHeart color='#FFA0F7' className="heart--Button" onClick={() => productDislike(product._id, user.email)}/>
                                                    </button>
                                                </Badge>
                                            </>
                                        }
                                            <button className="addTo--Cart--Button--Container">
                                                <FaShoppingCart onClick={() => {addToCart(user._id, product); setUser(oldState => ({
                                                    ...oldState,
                                                    cart: [
                                                        ...oldState.cart,
                                                        product
                                                    ]
                                                }))}}/>
                                            </button>
                                        </div>
                                        <img src={product.imageUrl} alt="product image" />
                                        <div className="product--About--Container">
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <p>{product.price}$</p>
                                        </div>
                                        <button className="About">About</button>
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