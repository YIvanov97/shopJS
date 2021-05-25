import './styles/app.scss';
import React from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsData from './Product'
import logo from './styles/images/NWN.png'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { FaCloudUploadAlt } from 'react-icons/fa';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      description: '',
      processor: '',
      ram: '',
      storage: '',
      imageFile: [],
      price: '',
      type: '',
      colors: '',
      products: [],
    };

    this.handleProductName = this.handleProductName.bind (this);
    this.handleProductDescription = this.handleProductDescription.bind (this);
    this.handleProductProcessor = this.handleProductProcessor.bind (this);
    this.handleProductRam = this.handleProductRam.bind (this);
    this.handleProductStorage = this.handleProductStorage.bind (this);
    this.handleProductImage = this.handleProductImage.bind (this);
    this.handleProductPrice = this.handleProductPrice.bind (this);
    this.handleProductType = this.handleProductType.bind (this);
    this.handleProductColors = this.handleProductColors.bind (this);
    this.handleLogout = this.handleLogout.bind (this);
    this.createProduct = this.createProduct.bind (this);
    this.getProducts = this.getProducts.bind (this);
    this.onRemove = this.onRemove.bind (this);
  }

  onSuccess = () =>
    toast.success ('Product created successfuly!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onWarn = () =>
    toast.warn ('All fields are required!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onError = () =>
    toast.error ('Something went wrong!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  onRemovedProduct = () =>
    toast.success ('Product removed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    handleLogout = () => {
      fetch('http://localhost:5000/auth/logout', {
          method: 'GET',
          credentials: 'include',
          withCredentials: true
      })
      .then(() => localStorage.clear())
      .then(() => window.location = 'http://localhost:3000')
      .catch(error => console.log(error))
    }

  createProduct (e) {
    e.preventDefault ();

    const data = new FormData()

    const colors = this.state.colors
    colors.forEach(el => {
      data.append(`color`, JSON.stringify(el))
    })

    const images = this.state.imageFile
    for (let i = 0; i < images.length; i++) {
      data.append(`imageFile`, images[i])
    }
    
    data.append("name", this.state.name)
    data.append("description", this.state.description)
    data.append("processor", this.state.processor)
    data.append("ram", this.state.ram)
    data.append("storage", this.state.storage)
    data.append("price", this.state.price)
    data.append("type", this.state.type)

    console.log(this.state.colors)

    fetch ('http://localhost:5000/products/create', {
      method: 'POST',
      body: data
    })
      .then (response => {
        if (response.status === 201) {
          this.setState ({
            name: '',
            description: '',
            imageFile: [],
            price: '',
            type: '',
            colors: []
          });
          this.onSuccess ();
        } else if (response.status === 500) {
          this.onError ();
        }
      })
      .then(() => this.getProducts())
      .catch (error => console.log (error.response));
  }

getProducts () {
    fetch ('http://localhost:5000/products/', {
      method: 'GET',
    })
      .then (response => response.json ())
      .then (response => {
        this.setState ({
          products: response,
        });
      })
      .catch (error => {
        console.error (error);
      });
  }

onRemove = (id) => {
    fetch(`http://localhost:5000/products/${id}/delete`, {
        method: 'POST'
    }).then(() => this.getProducts())
}

  componentDidMount() {
    this.getProducts();
  }

  handleProductName (e) {
    this.setState ({name: e.target.value});
  }

  handleProductDescription (e) {
    this.setState ({description: e.target.value});
  }

  handleProductProcessor (e) {
    this.setState ({processor: e.target.value});
  }

  handleProductRam (e) {
    this.setState ({ram: e.target.value});
  }

  handleProductStorage (e) {
    this.setState ({storage: e.target.value});
  }

  handleProductImage (e) {
    this.setState ({imageFile: e.target.files});
  }

  handleProductPrice (e) {
    this.setState ({price: e.target.value});
  }

  handleProductType (e) {
    this.setState ({type: e.target.value});
  }

  handleProductColors (colorOption) {
    this.setState ({colors: colorOption})
  }

  render () {

    const animatedComponents = makeAnimated();

    const colorsOptions = [
      {value: '#4f5b66', label: 'Space-Gray'},
      {value: '#a7adba', label: 'Silver'},
      {value: '#FFFFFF', label: 'White'},
      {value: '#F63204', label: 'Red'},
      {value: '#000000', label: 'Black'},
      {value: '#0095CB', label: 'Pacific Blue'}
    ]

    return (
      <div className="App">
        <h1 className="employee--Title">Employee</h1>
        <h2 className="addProduct--Title">Add new product</h2>
        <button className="logout--Button" onClick={this.handleLogout}>Logout</button>
        <main>
            <div className="employee--Create--Container">
            <img src={logo} className="login--logo" alt="logo" />
                <form className="createProduct--form" onSubmit={this.createProduct} encType="multipart/form-data">
                  <input
                    type="text"
                    placeholder="Product Name"
                    onChange={this.handleProductName}
                    value={this.state.name}
                  />
                  <input
                    type="text"
                    placeholder="Product Description"
                    onChange={this.handleProductDescription}
                    value={this.state.description}
                  />
                  <div className="product--SpecInputs--Container">
                    <select
                      type="text"
                      onChange={this.handleProductProcessor}
                      value={this.state.processor}
                      defaultValue=""                    
                    >
                      <option selected value="">Processor</option>
                      <option value="i7">i7</option>
                      <option value="i5">i5</option>
                      <option value="i9">i9</option>
                      <option value="S6">S6</option>
                      <option value="M1">M1</option>
                      <option value="A14">A14</option>
                    </select>
                    <select
                      type="text"
                      onChange={this.handleProductRam}
                      value={this.state.ram}
                      defaultValue=""                    
                    >
                      <option selected value="">Ram</option>
                      <option value="12">12</option>
                      <option value="8">8</option>
                      <option value="16">16</option>
                      <option value="32">32</option>
                      <option value="4">4</option>
                    </select>
                    <select
                      type="text"
                      onChange={this.handleProductStorage}
                      value={this.state.storage}
                      defaultValue=""                    
                    >
                      <option selected value="">Storage</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                      <option value="32GB">32GB</option>
                    </select>
                  </div>
                  <label htmlFor="file" className="file--Input--Container">
                    <input
                      type="file"
                      id="file"
                      multiple
                      className="file--Input"
                      filename="imageFile"
                      placeholder="Product Image"
                      onChange={this.handleProductImage}
                    />
                    <div className="file--Label--Container">
                      <FaCloudUploadAlt className="upload--Icon"/> Upload Image
                    </div>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Price"
                    onChange={this.handleProductPrice}
                    value={this.state.price}
                  />
                  <select
                    onChange={this.handleProductType}
                    value={this.state.type}
                    defaultValue=""
                  >
                    <option selected value="">Type</option>
                    <option value="phone">Phone</option>
                    <option value="tablet">Tablet</option>
                    <option value="laptop">Laptop</option>
                    <option value="computer">Computer</option>
                    <option value="watch">Watch</option>
                  </select>
                  <Select
                    className="product--Colors"
                    name="colors"
                    placeholder="Colors"
                    options={colorsOptions}
                    components={animatedComponents}
                    isClearable={true}
                    isMulti={true}
                    onChange={this.handleProductColors}
                  />
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
                  <ProductsData products={this.state.products} remove={this.onRemove} notify={this.onRemovedProduct}/>
                </table>
            </div>
        </main>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
