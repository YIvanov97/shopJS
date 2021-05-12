import React, { useContext } from 'react'
import {ProductContext} from './productContextProvider'

const ProductAbout = () => {

    const {product} = useContext(ProductContext)

    console.log(product, '111111')

    return(
        <div>hi{product?.name}</div>
    )
}

export default ProductAbout;