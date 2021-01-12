import React from 'react';
import {useHistory} from 'react-router-dom';
import UserService from '../../shared/api/service/UserService'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";

export const ProfilePreview = ({id, name, user}) => {
    const history = useHistory();
    

    const viewProfile = (id) => {
        console.log('id: ', id);
        history.push(`/profile/${id}`);
    }
    return (
        <div>
            {name}
            <Button onClick={()=> viewProfile(id)}>View profile</Button>
        </div>
    )
}
