import React, { useContext } from 'react'
import { API, UserContext } from './globalParams'
import logo from './styles/images/NWN.png'
import './styles/login.scss'

const Login = () => {

    // const {setUser} = useContext(UserContext)

    // const getUserData = () => {
    //     fetch(`${API}/auth/user`, {
    //         method: 'GET',
    //         withCredentials: true,
    //         credentials: 'include'
    //     })
    //     .then (response => response.json())
    //     .then (response => {
    //         console.log(response.user)
    //         setUser(response.user)
    //     })
    //     .catch (error => {
    //         console.error (error);
    //     });
    // }

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        if(user.email === '' || user.password === '') {
            //this.onWarning()
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
                    //getUserData()
                    setTimeout(() => {
                        window.location = '/'
                    }, 1000)
                } else if (response.status === 401) {
                    this.onError()
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
                    <input className="input--Form" type="text" name="email" placeholder="Email" />
                    <input className="input--Form" type="password" name="password" placeholder="Password" />
                    <input className="login--button" type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login;