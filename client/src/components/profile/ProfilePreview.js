import React, {useContext} from 'react';
import {UserContext} from "../../shared/UserContext"
import {useHistory} from 'react-router-dom';
import {Typography, Button} from '@material-ui/core'
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
            <Typography style={{
                    display:"inline",
                      marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "5vw"
                    }}>{name}</Typography>
            <Button
                color="primary"
                variant="contained" 
                style={{
                    display:"inline",
                      fontSize: 14,
                      marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "2vw"
                    }}
                onClick={()=> viewProfile(id)}>View profile</Button>
        </div>
    )
}
