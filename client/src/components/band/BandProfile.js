import React, {useContext, useState, useEffect} from 'react'
import Axios from "axios";
import { UserContext } from "../../shared/UserContext";
import UserService from "../../shared/services/UserService";
import img from '../../shared/images/music.svg'
import {checkStatus} from "../../utils/BandStatus";
import {Button, TextField, Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import './Band.css'

const BandProfile = (props) => {
  const currentUser = useContext(UserContext);
  const bandname = props.match.params;
  const [search, setSearch] = useState(bandname.bandid);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");
 
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
        let stat = checkStatus(bandname.bandid, currentUser)
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
          console.log("got from us", data);
          let stat = checkStatus(bandname.bandid, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
        });
    };

  useEffect(() => {
    
    if (!currentUser.user.want) {
        currentUser.user.want = [];
        console.log('no want list, created one');
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
        console.log('no seen list, created one');
      }
         let stat = checkStatus(bandname.bandid, currentUser)
         console.log('band: ', bandname.bandid, 'sta: ', stat)
         setStatus(stat[0])
         setStatusText(stat[1])
    fetchData()
  }, []);


  const searchForBand = (search) => {
     const BandAPI = Axios.create({
       baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
     });
     return BandAPI.get();
   };

  const fetchData = () => {
     if (search) {
       searchForBand(search)
         .then((response) => setData(response.data))
         .catch((error) => console.log(error));
     }
   };

  const displayData = () => {
     if (data && data.artist !== undefined) {
       return (
           <div className="bandViewWrapper">
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
          <CardHeader title={data.artist.name} />
             
             {data.artist.tags.tag[0] && <Typography className="genre">{data.artist.tags.tag[0].name}</Typography>}
              <img
               src={img}
               alt="profile pic"
               className="profilePic"
               width="200px"
             />
             <div className={status}>
               <Typography onClick={() => handleWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>{statusText}</Typography>
               <div className="dropDown">
                 <Typography onClick={() => handleWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                 <Typography onClick={() => handleSeen(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
               </div>           
             </div>
             <div className="description">
               <Typography>{data.artist.bio.summary}</Typography>
               <br />
             </div>
            </CardContent>
          </Card>
        </Grid>
         </div>
       );
     } else {
       return <div>oops, something went wrong while attempting to display data...</div>;
     }
   };
  return (
    <div className="bandViewWrapper">
      {data && data.artist !== undefined  ? (
        displayData()
      ) : (
        <div>oops, something went wrong...</div>
      )}
    </div>
  );
}

export default BandProfile;