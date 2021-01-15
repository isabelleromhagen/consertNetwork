import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/global/provider/UserContext';
import UserService from '../../shared/api/service/UserService';
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";
import { Card, CardContent, CardActions, Button, Container } from "@material-ui/core";
import "../../shared/global/css/Global.css";

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
        }
        console.log('want: ',profile.want);
        
      })
    } else if (currentUser.isAuthenticated) {
          console.log("current user: ", typeof currentUser.user.username, currentUser.user._id, currentUser.user.want);
          setProfile(currentUser);
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
    <Container>
    <Card>
      <div className="personalData">
      <div className="profileText">
      {profile.user && (
        <span className="username">{profile.user.username}</span>
      )}
      {profile.user && (
        <span className="profileBio">{profile.user.bio}</span>
      )}
      </div>
      <img
        src={ProfilePic}
        alt="profile pic"
        className="profilePic"
        width="200px"
      />
      </div>
      <div className="listWrapper" id="wantWrapper">
        <span className="subHeading">Want to see:</span>
        {want && (
          <div>
            {want.map((band) => (
              <span key={band} onClick={() => goToArtist(band.trim())}>
                {band}
              </span>
            ))}
          </div>
        )}
      </div>      
      <div className="listWrapper" id="seenWrapper">
        <span className="subHeading">Seen</span>
        {seen && (
          <div>
              {seen.map((band) => (
                <span key={band} onClick={() => goToArtist(band.trim())}>
              {band}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
    </Container>
    </div>
  );
};

export default ProfileView;