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
      imageFile: [],
      price: '',
      type: '',
      colors: '',
      products: [],
    };

    this.handleProductName = this.handleProductName.bind (this);
    this.handleProductDescription = this.handleProductDescription.bind (this);
    this.handleProductImage = this.handleProductImage.bind (this);
    this.handleProductPrice = this.handleProductPrice.bind (this);
    this.handleProductType = this.handleProductType.bind (this);
    this.handleProductColors = this.handleProductColors.bind (this);
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
