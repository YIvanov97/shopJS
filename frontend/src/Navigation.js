import React, {useContext} from 'react';
import './styles/navigation.scss'
import {Link} from 'react-router-dom';
import {UserContext, API} from './globalParams';
import { FiLogOut } from "react-icons/fi";
import { IoEnterOutline } from "react-icons/io5";


const Navigation = () => {

    const [user] = useContext(UserContext)

    const handleLogout = () => {
        fetch(`${API}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true
        })
        .then(() => localStorage.clear())
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
            <li>
                <Link className="link" to="/about">About</Link>
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
                    <button className="logout--Button effect effect-1" onClick={() => handleLogout()}>Logout <FiLogOut className="logout--Icon" size="20" color="#EFEFEF" /></button>
                </li>
            </>
            }
            {user.role === 'admin' ? 
                <li>
                    <a className="employee--Button" href="http://localhost:4000">
                        Employee
                        <IoEnterOutline className="employee--Icon" size="25" color="#EFEFEF" />
                    </a>
                </li>
                :
                <></>
            }
        </ul>
    );
}

export default Navigation;