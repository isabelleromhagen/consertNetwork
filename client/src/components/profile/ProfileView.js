import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import "./Profile.css";
import PlaceholderPic from "../../shared/images/user.svg";
import RoutingPath from "../../routes/RoutingPath";
import { Card, Typography, Grid, CardContent, CardHeader } from "@material-ui/core";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [fileId, setFileId] = useState("");
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();
  const [profileView, setProfileView] = useState({});

  const goToArtist = (artist) => {
      history.push(`/band/${artist}`);
  }

   useEffect(() => {
     
    if(props.match.params.userid !== "" && props.match.params.userid !== ":userid") {
      const userid = props.match.params.userid;
      console.log('current profile: ', currentUser.profile);
      UserService.getUser(userid).then(data => {
        
        if(data) {  
           console.log('current profile: ', currentUser.profile);
          setShowSpinner(true);
          setProfile(data);
          setWant(data.want);
          setSeen(data.seen);
          setFileId(data.fileId);
          currentUser.setProfile(data);
          setShowSpinner(false);
        }        
      })
    } else if (currentUser.isAuthenticated) {
       console.log('current profile: ', currentUser.profile);
          setShowSpinner(true);
          setProfile(currentUser.user);
          setWant(Array.from(currentUser.user.want));
          setSeen(Array.from(currentUser.user.seen));
          setFileId(currentUser.user.fileId);
          currentUser.setProfile(currentUser.user);
          setShowSpinner(false);
    } else {
      history.push(RoutingPath.signInView);
    }
   }, []);

  return (
    <div className="profileViewWrapper">
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
    <Card style={{ padding:'10vh', width: "70vw"}}>
      <CardContent>
      {profile && (
        <CardHeader title={currentUser.profile.username} style={{ marginLeft: "4vw"}}/>
      )}
      {profile && (
        <Typography style={{ marginLeft: "1vw"}}>{currentUser.profile.bio}</Typography>
      )}
     { currentUser.profile.fileId && <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
        { showSpinner &&  
            (<Loader type="Puff"
              color="#757575"
              height={100}
              width={100}
              timeout={3000}
              />)}
          {currentUser.profile.fileId === 'noImage' ? 
            (<img src={PlaceholderPic} alt="" style={{
                width:"20vh", 
                display:"block",
                fontSize: 14, 
                marginBottom: "5vh",
                marginTop: "5vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5px"}}/>
              ):(
            <img
              src={`/image/${currentUser.profile.fileId}`}
              alt="profile pic"
              className="profilePic"
              width="200px"
              style={{
                      display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      marginLeft: "auto",
                      marginRight: "auto",
                      borderRadius: "5px"
                }}
            />)
      }
      </div>}
      <div className="listWrapper" id="wantWrapper">
        <Typography className="subHeading" variant="h6">Want to see</Typography>
        {currentUser.profile.want && (
          <div>
            {currentUser.profile.want.map((band) => (
              <Typography key={band} className="preview" onClick={() => goToArtist(band.trim())}>
                {band}
              </Typography>
            ))}
          </div>
        )}
      </div>      
      <div className="listWrapper" id="seenWrapper">
        <Typography className="subHeading" variant="h6">Seen</Typography>
        {currentUser.profile.seen && (
          <div>
              {currentUser.profile.seen.map((band) => (
                <Typography key={band} className="preview" onClick={() => goToArtist(band.trim())}>
              {band}
              </Typography>
            ))}
          </div>
        )}
      </div>
      </CardContent>
    </Card>
    </Grid>
    </div>
  );
};

export default ProfileView;