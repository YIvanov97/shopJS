import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import UserContextProvider, { API } from './globalParams';
import ProductContextProvider from './productContextProvider';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Products from './Products';
import Cart from './Cart';
import ProductAbout from './ProductAbout';


function App() {
    return (
        <div className="App">
            <Router>
                <UserContextProvider>
                    <ProductContextProvider>
                  <Navigation/>
                  <Switch>
                    <Route exact path="/" render={() => {
                      return (
                        <Redirect to='/home' />
                      )
                    }} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/details/:id" component={ProductAbout} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/auth/login" component={Login} />
                    <Route exact path="/auth/register" component={Register} />
                    <Route exact path="/home" component={Home} />
                  </Switch>
                    </ProductContextProvider>
                </UserContextProvider>
            </Router>
        </div>
    );
}

export default App;
