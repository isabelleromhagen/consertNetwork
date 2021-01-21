import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import {checkStatus} from "../../utils/BandStatus";
import FeedService from '../../shared/services/FeedService';
import UserService from '../../shared/services/UserService'
// import "../BrowseView.css";


export const LatestAdded = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  const [status, setStatus] = useState("none");
  const [statusText, setStatusText] = useState("Not listed");

const viewProfile = (id) => {
        history.push(`/profile/${id}`);
    }
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
        let stat = checkStatus(feed[0].bandname, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])

          console.log("got from us", data);
        });

        const update = ({username:currentUser.user.username, bandStatus:"wants to see", bandname:band});
        console.log('update: ', update);
        FeedService.addToFeed(update).then(data => {

        })
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
          console.log("got from us", data);
          let stat = checkStatus(feed[0].bandname, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
        });

        const update = ({username:currentUser.user.username, bandStatus:"has seen", bandname:band});
        console.log('update: ', update);
        FeedService.addToFeed(update).then(data => {

        })
    };


  useEffect(() => {
    FeedService.getFeed().then(data => {
      setFeed(data);
      console.log('data: ', data);
    })
    // if(currentUser && currentUser.user) {
    if (currentUser && currentUser.user && !currentUser.user.want) {
        currentUser.user.want = [];
      }
    if (currentUser && currentUser.user && !currentUser.user.seen) {
        currentUser.user.seen = [];
      }
    if (feed && feed[0]) {
        console.log('in if', );
        let stat = checkStatus(feed[0].bandname, currentUser)
          console.log('band: ', feed[0].bandname, 'sta: ', stat)
          setStatus(stat[0])
          setStatusText(stat[1])
      }
      // }
      // if(feed && feed[0]) {
      // if(currentUser !== undefined && feed[0] !== undefined) {
        
  }, []);

  useEffect(() => {
        if (feed && feed[0] !== undefined && currentUser && currentUser !== undefined && currentUser.user) {
          
            let stat = checkStatus(feed[0].bandname, currentUser)
            console.log('useeffect update, checkstatus: ', stat);
            setStatus(stat[0])
            setStatusText(stat[1])
    }
  }, [status, feed]);

  const displayFeed = ({username, bandStatus, bandname}) => {
    // console.log('feed, ', feed[0], 'currentUser status, ', currentUser.user.seen);
    if(feed && feed[0]) {
      return (
        <div className="bandPreviewWrapper">
                  {<Typography onClick={() => viewProfile(username)} className="preview">{username}</Typography>}
                  {<Typography>{bandStatus}</Typography>}
                  {<Typography onClick={() => viewBand(bandname)} className="preview">{bandname}</Typography>}
                  <div className={checkStatus(bandname, currentUser)[0]}>
                      <Typography onClick={() => handleWanted(bandname)} style={{color:"rgb(217, 224, 205)"}}>{statusText}</Typography>
                      <div className="dropDown">
                          <Typography onClick={() => handleWanted(bandname)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                          <Typography onClick={() => handleSeen(bandname)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
                      </div>           
                </div>
              </div>
      )
        
    }
  }

  return (
    <div className="contentDiv">
      <Typography variant="h2">Latest updates</Typography>
          {feed.map((post) => 
            displayFeed(post))}
    </div>
  );
};

    // {bands.map((band) => (
    //       <BandPreview
    //         key={band.bandid}
    //         name={band.name}
    //         id={band.bandid}
    //         genre={band.genre}
    //       />
    //     ))}

    // <div className="itemsContainer">
    //       {feed.map((post) => 
    //         <div>{post.username} {post.bandStatus} {post.bandname}</div>
    //       )}
    //   </div>