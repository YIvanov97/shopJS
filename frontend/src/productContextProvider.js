import React, {useEffect, useState} from 'react';
import {API} from './globalParams';

export const ProductContext = React.createContext({})
const ProductProvider = ProductContext.Provider;

const ProductContextProvider = (props) => {
    const [product, setProduct] = useState({})
    
    
    const productData = (id) => {
        fetch (`${API}/products/details/${id}`, {
            method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
            setProduct(response)
        })
        .then(() => props.history.push(`/details/${id}`))
        .catch (error => {
            console.error (error);
        })
    }
    
    console.log(product)
    return (
        <ProductProvider value={{product, productData}}>
            {props.children}
        </ProductProvider>
    )
}   

export default ProductContextProvider;