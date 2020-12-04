import React from 'react';
import {useHistory} from 'react-router-dom';

export const ProfilePreview = ({id, name}) => {
    const history = useHistory();
    

    const viewProfile = (id) => {
        history.push(`/profile/${id}`);
    }
    return (
        <div>
            {name}
            <button onClick={()=> viewProfile(id)}>View profile</button>
        </div>
    )
}
