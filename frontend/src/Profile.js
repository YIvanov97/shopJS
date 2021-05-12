import React, {useContext} from 'react';
import {UserContext} from './globalParams'
import profilePicture from './styles/images/profilePicture.png'
import './styles/profile.scss'

const Profile = () => {

    const [user] = useContext(UserContext)

    return(
        <div className="profile--Body">
        <div className="blur--Background">
        </div>
        <div className="profile--Container">
            <img src={profilePicture} className="profile--Picture" alt="profile picture" />
            <div className="user--Info--Container">
                <h2 className="user--Info">Name: {user.name}</h2>
                <h2 className="user--Info">Username: {user.username}</h2>
                <h2 className="user--Info">E-mail: {user.email}</h2>
            </div>
        </div>
        </div>
    )
}

export default Profile;