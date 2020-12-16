import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/global/provider/UserContext';
import { WantContext } from "../../shared/global/provider/WantContext";
import { SeenContext } from "../../shared/global/provider/SeenContext";
import Bands from "../../shared/data/Bands";
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const wantContext = useContext(WantContext);
  const seenContext = useContext(SeenContext);

  const [bandData, setBandData] = useState(Bands.getBands());
  const [profile, setProfile] = useState({});
  const history = useHistory();


  //TODO: handle images. can they be saved in mongo?

   useEffect(() => {
    console.log("in profile");
    //if an id has been given, fetch that user from db. else show current user. if there's none, go to login.
    if(props.match.params.userid !== "" && props.match.params.userid !== ":userid") {
      console.log("visiting user: ", props.match.params.userid);
      
    } else if(currentUser.isAuthenticated) {
          console.log("current user: ", currentUser.user.username);
          setProfile(currentUser);
    } else {
      console.log('no id or auth user, heading to sign in');
      history.push(RoutingPath.signInView);
    }
    
   }, []);

  return (
    <div className="profileViewWrapper">
      {profile.user && <span className="username">{profile.user.username}</span>}
      <img
        src={ProfilePic}
        alt="profile pic"
        className="profilePic"
        width="200px"
      />

      <div className="listWrapper" id="wantWrapper">
        <span className="subHeading">Want to see</span>
        {wantContext && (
          <div>
            {wantContext.want
              .slice()
              .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
              .map((band) => (
                <div key={band.id}>
                  <p style={{ paddingRight: "10px" }}>{band.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="listWrapper" id="seenWrapper">
        <span className="subHeading">Seen</span>
        {seenContext && (
          <div>
            {seenContext.seen
              .slice()
              .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
              .map((band) => (
                <div key={band.id}>
                  <p style={{ paddingRight: "10px" }}>{band.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;


//   const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
//   const wantedBands = [band1, band2, band3];
//   const mappedWantedBands = wantedBands.map((band) => (
//     <img
//       src={band}
//       alt="band"
//       className="bandPic"
//       onClick={() => history.push(RoutingPath.bandView)}
//     />
//   ));
//   const seenBands = [band1, band2, band3];
//   const mappedSeenBands = seenBands.map((band) => (
//     <img src={band} alt="band" className="bandPic" />
//   ));
