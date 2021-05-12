import React from 'react'
import './styles/register.scss'
import { API } from './globalParams'
import logo from './styles/images/NWN.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const onSuccess = () => toast.success('Successful register!', {
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

    const onPasswordWarning = () => toast.warn('Password must be at least 6 signs!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    const handleRegister = (e) => {
        e.preventDefault()

        const user = {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        if(user.name === '' || user.username === '' || user.email === '' || user.password === '') {
            onWarning()
            return;
        }

        if(user.password.length < 6) {
            onPasswordWarning()
            return;
        }

        fetch(`${API}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
            if (response.status === 201) {
                onSuccess()
                setTimeout(() => {
                    window.location = '/auth/login'
                }, 1000)
            }
        })
        .catch(error => console.log(error.response))
    }

    return(
        <div className="register--Container">
            <h1 className="register--title">Register</h1>
            <div className="register--Form--Container">
                <img src={logo} className="register--logo" alt="logo" />
                <form className="register--form" onSubmit={handleRegister}>
                    <input className="input--Form" type="text" name="name" placeholder="Name" />
                    <input className="input--Form" type="text" name="username" placeholder="Username" />
                    <input className="input--Form" type="email" name="email" placeholder="Email" />
                    <input className="input--Form" type="password" name="password" placeholder="Password" />
                    <input className="register--button" type="submit" value="Register" />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register;