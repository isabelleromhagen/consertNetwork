import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { WantContext } from "../../shared/global/provider/WantContext";
import { SeenContext } from "../../shared/global/provider/SeenContext";
import Users from '../../shared/data/Users'
import Bands from "../../shared/data/Bands";
import "./Profile.css";
import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";
import band1 from "../../shared/images/band1.jpg";
import band2 from "../../shared/images/band2.jpg";
import band3 from "../../shared/images/band3.jpg";

export const ProfileView = (props) => {
  const wantContext = useContext(WantContext);
  const seenContext = useContext(SeenContext);

  const { userid } = props.match.params;
  console.log(props.match.params);

  const [userData, setUserData] = useState(Users.getUsers());
  const [bandData, setBandData] = useState(Bands.getBands());
  const [user, setUser] = useState({});
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const history = useHistory();

   useEffect(() => {
     setUser(userData.find((user) => user.userid.toString() === userid));
    console.log(userData);
   }, []);

  return (
    <div className="profileViewWrapper">
      { user && <span className="username">{user.name}</span>} 
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
        {seenContext &&
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
        }
      </div>
    </div>
  );
};


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
