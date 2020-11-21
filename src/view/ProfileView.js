import React, { useContext } from "react";
import { UserContext } from "../shared/global/provider/UserProvider";
import "./ProfileView.css";
import ProfilePic from "../shared/images/profilePic.jpg";
import { useHistory } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";
import band1 from "../shared/images/band1.jpg";
import band2 from "../shared/images/band2.jpg";
import band3 from "../shared/images/band3.jpg";


export const ProfileView = () => {
  const history = useHistory();
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const wantedBands = [band1, band2, band3]
  const mappedWantedBands = wantedBands.map((band) => (
    <img
      src={band}
      alt="band"
      className="bandPic"
      onClick={() => history.push(RoutingPath.bandView)}
    />
  ));
  const seenBands = [band1, band2, band3];
  const mappedSeenBands = seenBands.map((band) => (
    <img src={band} alt="band" className="bandPic" />
  ));

  return (
    <div className="profileViewWrapper">
      <span className="username">{authenticatedUser}</span>
      <img
        src={ProfilePic}
        alt="profile pic"
        className="profilePic"
        width="200px"
      />

      <div className="listWrapper" id="wantWrapper">
        <span className="subHeading">Want to see</span>
        {mappedWantedBands}
      </div>
      <div className="listWrapper" id="seenWrapper">
        <span className="subHeading">Seen</span>
        {mappedSeenBands}
      </div>
    </div>
  );
};
