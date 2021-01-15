import React, {useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/global/provider/UserContext'
import UserService from '../../shared/api/service/UserService'
import {checkStatus} from "../../utils/BandStatus";
import '../browse/BrowseView.css'
import './Band.css'

export const BandPreview = ({ id, name, genre }) => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [status, setStatus] = useState("none");
  const [statusText, setStatusText] = useState("Not listed");
  const viewBand = (name) => {
    history.push(`/band/${name}`);
  };

const handleWanted = (band) => {
      console.log('band to handle ', band);
      console.log('current user: ', currentUser);
      if (!currentUser.user.want) {
        currentUser.user.want = [];
        console.log('no want list, created one');
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
        console.log('no seen list, created one');
      }
      console.log("in handle wanted, current lists: ", currentUser.user.want, currentUser.user.seen);
      //check is already marked as want, if true remove from want in currentUser
      if (currentUser.user.want.includes(band)) {
        currentUser.user.want = currentUser.user.want.filter((item) => item !== band);
        console.log("in if incl want, updated: ", currentUser.user.want);
      } else {
        //if band is on seen list, remove from seen in currentUser
        if (currentUser.user.seen.includes(band)) {
          currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band);
          console.log("in if incl seen, updated: ", currentUser.user.seen);
        }
        //add band to want in currentUser
        currentUser.user.want.push(band);
        console.log("in else, updated: ", currentUser.user.want);
      }
      //update db with currentUser lists updated above
      console.log("arrays going into db:", currentUser.user.want, ' seen:', currentUser.user.seen);
      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, want: currentUser.user.want, seen: currentUser.user.seen})
      UserService.updateCurrentUser(data).then(data => {
        let stat = checkStatus(name, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
          console.log("got from us", data);
        });
    };

       const handleSeen = (band) => {
      console.log('band to handle ', band);
      console.log('current user: ', currentUser);
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
        console.log('no seen list, created one');
      }
      if (!currentUser.user.want) {
        currentUser.user.want = [];
        console.log('no want list, created one');
      }
      console.log("in handle seen, current lists: ", currentUser.user.want, currentUser.user.seen);
      //check is already marked as seen, if true remove from seen in currentUser
      if (currentUser.user.seen.includes(band)) {
        currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band);
        console.log("in if incl want, updated: ", currentUser.user.seen);
      } else {
        //if band is on want list, remove from seen in currentUser
        if (currentUser.user.want.includes(band)) {
          currentUser.user.want = currentUser.user.want.filter((item) => item !== band);
          console.log("in if incl want, updated: ", currentUser.user.want);
        }
        //add band to seen in currentUser
        currentUser.user.seen.push(band);
        console.log("in else, updated: ", currentUser.user.seen);
      }
      //update db with currentUser lists updated above
      console.log("arrays going into db:", currentUser.user.want, ' seen:', currentUser.user.seen);
      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, want: currentUser.user.want, seen: currentUser.user.seen})
      UserService.updateCurrentUser(data).then(data => {
        let stat = checkStatus(name, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
          console.log("got from us", data);
        });
    };

    // const checkStatus = (band) => {

    //     if(!currentUser) {
    //       setStatus("none")
    //       setStatusText("Not listed")
         
    //     } else {
    //         if(currentUser.user.want.includes(band)) {
    //         setStatus("want")
    //         setStatusText("Want to see")
    //     }
    //     else if (currentUser.user.seen.includes(band)) {
    //       setStatus("seen")
    //       setStatusText("Seen")
    //     } else {
    //       setStatus("none")
    //       setStatusText("Not listed")
    //     }
    //     }
        
    // }

  useEffect(() => {
    if (!currentUser.user.want) {
        currentUser.user.want = [];
        console.log('no want list, created one');
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
        console.log('no seen list, created one');
      }
    // fetchData()
    let stat = checkStatus(name, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
  }, []);

  return (
    <div className="bandPreviewWrapper">
      <span onClick={() => viewBand(name)} className="preview">{name}</span>
      <span onClick={() => viewBand(name)}>{genre}</span>
       <div className={status}>
            <span onClick={() => handleWanted(name)} style={{color:"rgb(217, 224, 205)"}}>{statusText}</span>
            <div className="dropDown">
                <span onClick={() => handleWanted(name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</span>
                <span onClick={() => handleSeen(name)} style={{color:"rgb(217, 224, 205)"}}>Seen</span>
            </div>           
        </div>
    </div>
  );
};
