import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/global/provider/UserContext'
import UserService from '../../shared/api/service/UserService'
import '../browse/BrowseView.css'

export const BandPreview = ({ id, name, genre }) => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const viewBand = (name) => {
    history.push(`/band/${name}`);
  };

//should do a put to /me and to array of want
  const handleWanted = (band) => {
    if(!currentUser.want) {
        currentUser.want = [];
    }
    console.log("in handle wanted: ", currentUser.want);
    if (currentUser.want.includes(band)) {
      currentUser.want = currentUser.want.filter(item => item !== band)
      console.log("in if incl, updated: ", currentUser.want);
    } else {
      currentUser.want.push(band);
      console.log("in else, updated: ", currentUser.want);
    }
    console.log('array going into db:', currentUser.want);
    UserService.updateCurrentUser(currentUser.token, currentUser.want).then(data => {
      console.log('got from us', data);
    })
  };
  
  const handleSeen = (band) => {
     if (!currentUser.seen) {
       currentUser.seen = [];
     }
     console.log("in handle seen: ", currentUser.seen);
     if (currentUser.seen.includes(band)) {
       currentUser.seen = currentUser.seen.filter((item) => item !== band);
       console.log("in if incl, updated: ", currentUser.seen);
     } else {
       currentUser.seen.push(band);
       console.log("in else, updated: ", currentUser.seen);
     }
     UserService.updateCurrentUser(currentUser.token, currentUser.seen).then(
       (data) => {
         console.log("got from us", data);
       }
     );
  };
  return (
    <div className="bandPreviewWrapper">
      <span onClick={() => viewBand(name)}>{name}</span>
      <span onClick={() => viewBand(name)}>{genre}</span>
      <div className="statusWrapper">
        <span onClick={() => handleWanted(name)}>Want to see</span>
        <div className="dropDown">
          <span onClick={() => handleSeen(name)}>Seen</span>
        </div>
      </div>
    </div>
  );
};
