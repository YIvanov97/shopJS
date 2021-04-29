import React, {useContext} from 'react';
import './styles/navigation.scss'
import {Link} from 'react-router-dom';
import {UserContext, API} from './globalParams';

const Navigation = () => {

    const {user} = useContext(UserContext)

    const handleLogout = () => {
        fetch(`${API}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true
        })
        .then(() => window.location = '/')
        .catch(error => console.log(error))
      }

    return (
        <ul>
            <li>
                <Link className="link" to="/home">Home</Link>
            </li>
            <li>
                <Link className="link" to="/products">Products</Link>
            </li>
            {!user.email ? 
            <>
                <li>
                    <Link className="link" to="/auth/login">Login</Link>
                </li>
                <li>
                    <Link className="link" to="/auth/register">Register</Link>
                </li>
            </>
            :
            <>
                <li>
                    <Link className="link" to="/cart">Cart</Link>
                </li>
                <li>
                    <Link className="link" to="/profile">Profile</Link>
                </li>
                <li>
                    <button className="logout--Button" onClick={() => handleLogout()}>Logout</button>
                </li>
            </>
            }
            
            
        </ul>
    );
}

export default Navigation;