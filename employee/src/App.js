import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsData from './Product'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion"

function App() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [processor, setProcessor] = useState('')
  const [ram, setRam] = useState('')
  const [storage, setStorage] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [products, setProducts] = useState([])
  const [imagesColors, setImagesColors] = useState([{images: [], colors: ''}])

  const onSuccess = () =>
    toast.success ('Product created successfuly!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const onWarn = () =>
    toast.warn ('All fields are required!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const onError = () =>
    toast.error ('Something went wrong!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const onRemovedProduct = () =>
    toast.success ('Product removed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const handleLogout = () => {
      fetch('http://localhost:5000/auth/logout', {
          method: 'GET',
          credentials: 'include',
          withCredentials: true
      })
      .then(() => localStorage.clear())
      .then(() => window.location = 'http://localhost:3000')
      .catch(error => console.log(error))
  }

  const reloadProducts = () => {
    fetch ('http://localhost:5000/products/', {
      method: 'GET',
    })
    .then (response => response.json ())
    .then (response => {
      setProducts(response)
    })
    .catch (error => {
      console.error (error);
    })
  }

  const createProduct = (e) => {
    e.preventDefault ();

    if (
      name === '' || 
      description === '' ||
      processor === '' ||
      ram === '' ||
      storage === '' ||
      price === '' ||
      type === ''
    ) {
      onWarn()
      return;
    }

    const data = new FormData()
    
    data.append("name", name)
    data.append("description", description)
    data.append("processor", processor)
    data.append("ram", ram)
    data.append("storage", storage)
    for (const imageAndColor of imagesColors) {
      data.append('images', imageAndColor.image[0]);
      data.append('colors', imageAndColor.color);
    }
    data.append("price", price)
    data.append("type", type)

    fetch ('http://localhost:5000/products/create', {
      method: 'POST',
      body: data
    })
      .then (response => {
        if (response.status === 201) {
          setName('')
          setDescription('')
          setProcessor('')
          setRam('')
          setStorage('')
          setPrice('')
          setType('')
          onSuccess ();
        } else if (response.status === 500) {
          onError ();
        }
      })
      .then(() => reloadProducts())
      .catch (error => console.log (error.response));
    }

    useEffect(() => {
        fetch ('http://localhost:5000/products/', {
          method: 'GET',
        })
        .then (response => response.json ())
        .then (response => {
          setProducts(response)
        })
        .catch (error => {
          console.error (error);
        })
    }, [])

    const onRemove = (id) => {
        fetch(`http://localhost:5000/products/${id}/delete`, {
            method: 'POST'
        })
    }

  const handleProductName = (e) => {
    setName(e.target.value)
  }

  const handleProductDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleProductProcessor = (e) => {
    setProcessor(e.target.value)
  }

  const handleProductRam = (e) => {
    setRam(e.target.value)
  }

  const handleProductStorage = (e) => {
    setStorage(e.target.value)
  }

  const handleProductPrice = (e) => {
    setPrice(e.target.value)
  }

  const handleProductType = (e) => {
    setType(e.target.value)
  }

  const handleInputChangeColor = (e, index) => {
    const { name, value } = e.target;
    const list = [...imagesColors];
    list[index][name] = value;
    setImagesColors(list);
  };

  const handleInputChangeImage = (e, index) => {
    const {name, files} = e.target;
    const list = [...imagesColors];
    list[index][name] = files;
    setImagesColors(list);
  };

  const handleRemoveClick = index => {
    const list = [...imagesColors];
    list.splice(index, 1);
    setImagesColors(list);
  };

  const handleAddClick = () => {
    setImagesColors([...imagesColors, { image: {}, color: "" }]);
  };

    return (
      <div className="App">
        <h1 className="employee--Title">Employee</h1>
        <button className="logout--Button" onClick={() => handleLogout()}>Logout <FiLogOut className="logout--Icon" size="20" color="#EFEFEF" /></button>
        <h2 className="addProduct--Title">Add new product</h2>
        <main>
            <div className="employee--Create--Container">
                <form className="createProduct--form" onSubmit={createProduct} encType="multipart/form-data">
                  <input
                    type="text"
                    placeholder="Product Name"
                    onChange={handleProductName}
                    value={name}
                  />
                  <input
                    type="text"
                    placeholder="Product Description"
                    onChange={handleProductDescription}
                    value={description}
                  />
                  <div className="product--SpecInputs--Container">
                    <select
                      type="text"
                      onChange={handleProductProcessor}
                      value={processor}                    
                    >
                      <option selected value="">Processor</option>
                      <option value="i7">i7</option>
                      <option value="i5">i5</option>
                      <option value="i9">i9</option>
                      <option value="S6">S6</option>
                      <option value="M1">M1</option>
                      <option value="A14">A14</option>
                      <option value="none">none</option>
                    </select>
                    <select
                      type="text"
                      onChange={handleProductRam}
                      value={ram}                   
                    >
                      <option selected value="">Ram</option>
                      <option value="12">12</option>
                      <option value="8">8</option>
                      <option value="16">16</option>
                      <option value="32">32</option>
                      <option value="4">4</option>
                      <option value="none">none</option>
                    </select>
                    <select
                      type="text"
                      onChange={handleProductStorage}
                      value={storage}                   
                    >
                      <option selected value="">Storage</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                      <option value="32GB">32GB</option>
                      <option value="none">none</option>
                    </select>
                  </div>
                  {imagesColors.map((x, i) => {
                    return (
                      <div className="image--Color--Container" key={i}>
                        <label htmlFor="file" className="file--Input--Container">
                          <input
                            type="file"
                            id="file"
                            name="image"
                            className="file--Input"
                            filename="imageFile"
                            placeholder="Product Image"
                            onChange={e => handleInputChangeImage(e, i)}
                          />
                          <div className="file--Label--Container">
                             <FaCloudUploadAlt className="upload--Icon"/> Upload Image
                          </div>
                        </label>
                        <select
                          onChange={e => handleInputChangeColor(e, i)}
                          value={x.color}
                          name="color"
                        >
                          <option selected value="">Color</option>
                          <option value='#4f5b66'>Space-gray</option>
                          <option value='#a7adba'>Silver</option>
                          <option value='#FFFFFF'>White</option>
                          <option value='#F63204'>Red</option>
                          <option value='#000000'>Black</option>
                          <option value='#0095CB'>Pacific-Blue</option>
                        </select>
                        <div className="buttons--Container">
                          {imagesColors.length !== 1 && 
                            <button className='remove' onClick={() => handleRemoveClick(i)}>
                              <motion.div whileHover={{scale: 1.1}}>
                                <IoRemoveCircleSharp size="40" color="#FF6D85" />
                              </motion.div>
                            </button>}
                          {imagesColors.length - 1 === i && 
                            <motion.div whileHover={{scale: 1.1}}>
                              <button className='add' onClick={handleAddClick}>
                                <h3>+ Color Option</h3>
                              </button>
                            </motion.div>}
                        </div>
                      </div>
                    );
                  })}
                  <input
                    type="text"
                    placeholder="Product Price (Exp. 1999)"
                    onChange={handleProductPrice}
                    value={price}
                  />
                  <select
                    onChange={handleProductType}
                    value={type}
                  >
                    <option selected value="">Type</option>
                    <option value="phone">Phone</option>
                    <option value="tablet">Tablet</option>
                    <option value="laptop">Laptop</option>
                    <option value="computer">Computer</option>
                    <option value="watch">Watch</option>
                    <option value="headphones">Headphones</option>
                  </select>
                  <input
                    type="submit"
                    value="Create"
                    className="create--button"
                  />
                </form>
            </div>
            <div>
                <table className="added--Products">
                  <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Processor</th>
                      <th>Ram</th>
                      <th>Storage</th>
                      <th>Type</th>
                      <th>Price</th>
                  </tr>
                  <ProductsData products={products} remove={onRemove} notify={onRemovedProduct} reload={reloadProducts}/>
                </table>
            </div>
        </main>
        <ToastContainer />
      </div>
    );
  }

export default App;