import React from 'react';
import {useHistory} from 'react-router-dom';
import "../browse/BrowseView.css"


export const ProfilePreview = ({id, name, user}) => {
    const history = useHistory();
    

    const viewProfile = (id) => {
        history.push(`/profile/${id}`);
    }
    return (
        <div className="previewContainer">
            <span>{name}</span>
            <button onClick={()=> viewProfile(id)}>View profile</button>
        </div>
    )
}
