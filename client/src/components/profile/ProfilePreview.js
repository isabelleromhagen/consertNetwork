import React, {useContext} from 'react';
import {UserContext} from "../../shared/UserContext"
import {useHistory} from 'react-router-dom';
import {Typography, Button, Grid} from '@material-ui/core'
import "../browse/BrowseView.css"


export const ProfilePreview = ({id, name, user}) => {
    const history = useHistory();
    const currentUser = useContext(UserContext);
    

    const viewProfile = (id) => {
        currentUser.setProfile({});
        history.push(`/profile/${id}`);
    }
    return (
        <div className="bandPreviewWrapper">
            <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"

      >
            <Typography 
            style={{marginBottom: "5vh"}}
                    >{name}</Typography>
            <Button
                color="primary"
                variant="contained" 
                onClick={()=> viewProfile(id)}>View profile</Button>
                </Grid>
        </div>
    )
}
