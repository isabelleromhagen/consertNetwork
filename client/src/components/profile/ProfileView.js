import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/global/provider/UserContext';
import UserService from '../../shared/api/service/UserService';
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const [profile, setProfile] = useState({});
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
          console.log("current user: ", currentUser.user.username);
          setProfile(currentUser);
    } else {
      console.log('no id or auth user, heading to sign in');
      history.push(RoutingPath.signInView);
    }
   }, []);

  return (
    <div className="profileViewWrapper">
      {profile.user && (
        <span className="username">{profile.user.username}</span>
      )}
      {profile.username && <span className="username">{profile.username}</span>}
      <img
        src={ProfilePic}
        alt="profile pic"
        className="profilePic"
        width="200px"
      />
      <div className="listWrapper" id="wantWrapper">
        <span className="subHeading">Want to see</span>
        {profile.want && (
          <div>
            {profile.want.map((band) => (
              <span key={band} onClick={() => goToArtist(band)}>
                {band}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="listWrapper" id="seenWrapper">
        <span className="subHeading">Seen</span>
        {profile.seen && (
          <div>
            {profile.seen.map((band) => (
              <span key={band} onClick={() => goToArtist(band)}>
                {band}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;