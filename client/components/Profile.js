import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./EditProfile";
import { deleteProfile } from "../store/auth";

const Profile = () => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()

    if (auth.id) {
        return (
            <div className="profile-container">
            <div className="profile-id">
                <h1>{auth.name} {auth.lastName}</h1> <button onClick={() => dispatch(deleteProfile(auth.id))}>X</button>
                <img src={auth.imageUrl}></img>
                <p>Hobbies: {auth.hobbies}</p>
                <p>Interest: {auth.interest}</p>
                <p>Gender: {auth.gender}</p>
            </div>
            <h3>Edit Your Profile</h3>
            <ProfileForm />
            </div>
        )
    }
}

export default Profile;