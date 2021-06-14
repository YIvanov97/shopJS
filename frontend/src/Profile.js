import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from './globalParams'
import profilePicture from './styles/images/profilePicture.png'
import './styles/profile.scss'
import { AiFillEdit } from "react-icons/ai";
import { motion } from 'framer-motion'


const Profile = () => {

    const [user, setUser, addToCart, removeFromCart, setChosenImage, updateUser, disabled, setDisabled] = useContext(UserContext)
    const [localProfile, setLocalProfile] = useState([])

    useEffect(() => {
        if(localStorage.hasOwnProperty("profile")) {
            let getProfile = localStorage.getItem("profile")
            try {
                getProfile = JSON.parse(getProfile)
                setLocalProfile(getProfile)
            } catch (e) {
                setLocalProfile([])
            }
        }
    }, [setLocalProfile])

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser(oldState => ({ ...oldState, [name]: value }))
    }

    const handleLocalInputChange = e => {
        const value = e.target
        setLocalProfile(() => value)
    }

    return(
        <div className="profile--Body">
        <div className="blur--Background">
        </div>
        <div className="profile--Container">
            <img src={profilePicture} className="profile--Picture" alt="profileimg" />
            <form className="user--Info--Container" onSubmit={updateUser}>    
            <motion.div whileHover={{scale: 1.2}} className="edit--Button--Container">
                <AiFillEdit size="25" color="#00B0FF" onClick={() => setDisabled(true)}/>
            </motion.div>
                {localProfile?.length === 0 ?
                <>
                    <h2 className="user--Info">Name:</h2>
                    <input type="text" name="name" disabled={disabled === true ? false : true} style={disabled === false ? {border: 'none'} : {border: '1px solid #1E718D'}} value={user.name} onChange={handleInputChange}/>
                    <h2 className="user--Info">Username:</h2>
                    <input type="text" name="username" disabled={disabled === true ? false : true} style={disabled === false ? {border: 'none'} : {border: '1px solid #1E718D'}} value={user.username} onChange={handleInputChange}/>
                </>
                :
                <>
                    <h2 className="user--Info">Name:</h2>
                    <input type="text" name="name" disabled={disabled === true ? false : true} style={disabled === false ? {border: 'none'} : {border: '1px solid #1E718D'}} value={localProfile[0]} onChange={handleLocalInputChange}/>
                    <h2 className="user--Info">Username:</h2>
                    <input type="text" name="username" disabled={disabled === true ? false : true} value={localProfile[1]} style={disabled === false ? {border: 'none'} : {border: '1px solid #1E718D'}} onChange={handleLocalInputChange}/>
                </>
                }
                <h2 className="user--Info">E-mail:</h2>
                <h4>{user.email}</h4>
                <div className="submit--EditButton--Container" whileHover={{scale: 1.06}}>
                    <div className="cancle--Edit--Container" style={disabled === false ? {display: 'none'} : {display: 'flex'}}>
                        <input className="cancle--Edit--Button" value="Cancel" onClick={() => setDisabled(false)}/>
                    </div>
                    <input className="submit--Edit--Button" type="submit" value="Edit" style={disabled === false ? {display: 'none'} : {display: 'flex'}}/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Profile;