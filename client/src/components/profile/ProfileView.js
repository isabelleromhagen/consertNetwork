import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";
import { Card, Typography, Grid, CardContent, CardHeader } from "@material-ui/core";
// import "../../shared/global/css/Global.css";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const history = useHistory();

  const goToArtist = (artist) => {
      history.push(`/band/${artist}`);
  }
  //TODO: handle images. can they be saved in mongo?
   useEffect(() => {
    console.log("in profile");
    //if an id has been given, fetch that user from db. else show current user. if there's none, go to login.
    if(props.match.params.userid !== "" && props.match.params.userid !== ":userid") {
      const userid = props.match.params.userid;
      UserService.getUser(userid).then(data => {
        console.log('back from service, data: ', data, ' want: ', data.want);
        if(data) {
          setProfile(data);
          setWant(data.want);
          setSeen(data.seen);
        }
        console.log('want: ',profile.want);
        
      })
    } else if (currentUser.isAuthenticated) {
          console.log("current user: ", typeof currentUser.user.username, currentUser.user._id, currentUser.user.want);
          console.log("current user.user: ", currentUser.user);
          setProfile(currentUser.user);
          setWant(Array.from(currentUser.user.want));
          setSeen(Array.from(currentUser.user.seen));
          console.log('want: ', typeof currentUser.user.want, currentUser.user.want);
    } else {
      console.log('no id or auth user, heading to sign in');
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
    <Card style={{ padding:'10vh' }}>
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
        <Typography className="subHeading">Want to see:</Typography>
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
        <Typography className="subHeading">Seen</Typography>
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