import React, {useEffect, useState} from 'react';

export const UserContext = React.createContext({})
const UserProvider = UserContext.Provider;

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        fetch(`${API}/auth/user`, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
        .then (response => response.json())
        .then (response => {
            setUser(response.user)
        })
        .catch (error => {
            console.error (error);
        });
    }, [setUser])

    return (
        <UserProvider value={{user, setUser}}>
            {props.children}
        </UserProvider>
    )
}   

export default UserContextProvider;

export let API = 'http://localhost:5000';