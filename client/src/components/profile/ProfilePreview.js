import React from 'react';
import {useHistory} from 'react-router-dom';
import {Typography, Button} from '@material-ui/core'
import "../browse/BrowseView.css"


export const ProfilePreview = ({id, name, user}) => {
    const history = useHistory();
    

    const viewProfile = (id) => {
        history.push(`/profile/${id}`);
    }
    return (
        <div className="bandPreviewWrapper">
            <Typography style={{
                    display:"block",
                      marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "5vw"
                    }}>{name}</Typography>
            <Button
                color="primary"
                variant="contained" 
                style={{
                    display:"block",
                      fontSize: 14, //customize in px
                      marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "2vw"
                    }}
                onClick={()=> viewProfile(id)}>View profile</Button>
        </div>
    )
}
