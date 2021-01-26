import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";
import { Card, Typography, Grid, CardContent, CardHeader } from "@material-ui/core";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const history = useHistory();

  const goToArtist = (artist) => {
      history.push(`/band/${artist}`);
  }

   useEffect(() => {
    //if an id has been given, fetch that user from db. else show current user. if there's none, go to login.
    if(props.match.params.userid !== "" && props.match.params.userid !== ":userid") {
      const userid = props.match.params.userid;
      UserService.getUser(userid).then(data => {
        if(data) {
          setProfile(data);
          setWant(data.want);
          setSeen(data.seen);
        }        
      })
    } else if (currentUser.isAuthenticated) {
          setProfile(currentUser.user);
          setWant(Array.from(currentUser.user.want));
          setSeen(Array.from(currentUser.user.seen));
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
     
        <CardHeader title={profile.username} style={{ marginLeft: "4vw"}}/>
      )}
      {profile && (
        <Typography style={{ marginLeft: "1vw"}}>{profile.bio}</Typography>
      )}
  
      <img
        src={ProfilePic}
        alt="profile pic"
        className="profilePic"
        width="200px"
        style={{
                display:"block",
                fontSize: 14, //customize in px
                marginBottom: "5vh",
                marginTop: "5vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5px"
          }}
      />
    
      <div className="listWrapper" id="wantWrapper">
        <Typography className="subHeading" variant="h6">Want to see</Typography>
        {want && (
          <div>
            {want.map((band) => (
              <Typography key={band} onClick={() => goToArtist(band.trim())}>
                {band}
              </Typography>
            ))}
          </div>
        )}
      </div>      
      <div className="listWrapper" id="seenWrapper">
        <Typography className="subHeading" variant="h6">Seen</Typography>
        {seen && (
          <div>
              {seen.map((band) => (
                <Typography key={band} onClick={() => goToArtist(band.trim())}>
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