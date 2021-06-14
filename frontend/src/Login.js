import React from 'react'
import { API } from './globalParams'
import logo from './styles/images/NWN.png'
import './styles/login.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";


const Login = () => {

    const onSuccess = () => toast.success('Login successful!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const onWarning = () => toast.warn('All fields required!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const onError = () => toast.error('Wrong Email or Password!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        if(user.email === '' || user.password === '') {
            onWarning()
            return;
        }

        fetch(`${API}/auth/login`,{
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((response) => {
                if(response.status === 200) { 
                    onSuccess()
                    setTimeout(() => {
                        window.location = '/'
                    }, 1000)
                } else if (response.status === 401) {
                    onError()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div className="login--Container">
            <h1 className="login--title">Login</h1>
            <div className="login--Form--Container">
                <img src={logo} className="login--logo" alt="logo" />
                <form className="login--form" onSubmit={handleLogin}>
                    <div className="form--Input--Container">
                        <input className="input--Form" type="text" name="email" placeholder="Email" />
                        <AiOutlineMail className="loginForm--Input--Icon" size="20" color="#EFEFEF"/>
                    </div>
                    <div className="form--Input--Container">
                        <input className="input--Form" type="password" name="password" placeholder="Password" />
                        <AiOutlineLock className="loginForm--Input--Icon" size="20" color="#EFEFEF" />
                    </div>
                    <input className="login--button" type="submit" value="Login" />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;