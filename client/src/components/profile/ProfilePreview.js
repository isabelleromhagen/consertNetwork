import React from 'react';
import {useHistory} from 'react-router-dom';
import UserService from '../../shared/api/service/UserService'

export const ProfilePreview = ({id, name, user}) => {
    const history = useHistory();
    

    const viewProfile = (id) => {
        console.log('id: ', id);
        history.push(`/profile/${id}`);
    }
    return (
        <div>
            {name}
            <button onClick={()=> viewProfile(id)}>View profile</button>
        </div>
    )
}
