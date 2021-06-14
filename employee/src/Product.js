import { FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductData = props => {
    return(
        props.products.map(product => {
            return (   
                <tr>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.processor}</td>
                    <td>{product.ram}</td>
                    <td>{product.storage}</td>
                    <td>{product.type}</td>
                    <td>{product.price}$</td>
                    <td>
                        <span className="removeProduct--Container" onClick={() => {props.remove(product._id); props.notify(); props.reload()}}>
                            <motion.div whileHover={{scale: 1.1}}>
                                <FaTrashAlt className="remove--Icon" />
                            </motion.div>
                        </span>
                    </td>
                </tr>
            )
        }).reverse()
    )
}

export default ProductData;