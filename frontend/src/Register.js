import React from 'react'
import './styles/register.scss'
import { API } from './globalParams'
import logo from './styles/images/NWN.png'

const Register = () => {

    const handleRegister = (e) => {
        e.preventDefault()

        const user = {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        if(user.name === '' || user.username === '' || user.email === '' || user.password === '') {
            //this.onWarning()
            return;
        }

        if(user.password.length < 6) {
            //this.onPasswordWarning()
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
        </div>
    )
}

export default Register;