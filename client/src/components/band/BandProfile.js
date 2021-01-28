import React, {useContext, useState, useEffect} from 'react'
import Axios from "axios";
import { UserContext } from "../../shared/UserContext";
import img from '../../shared/images/music.svg'
import {checkStatus, handleWanted, handleSeen} from "../../utils/BandStatus";
import {Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Band.css'

const BandProfile = (props) => {
  const currentUser = useContext(UserContext);
  const bandname = props.match.params;
  const [search, setSearch] = useState(bandname.bandid);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");
 
useEffect(() => { 

    if (currentUser && currentUser.user && !currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (currentUser && currentUser.user && !currentUser.user.seen) {
        currentUser.user.seen = [];
      }
         let stat = checkStatus(bandname.bandid, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
    fetchData()
  }, []);

  const searchForBand = (search) => {
     const BandAPI = Axios.create({
       baseURL: `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
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

  const prepareWanted = async (band) => {
    if(currentUser.isAuthenticated) {
    const bandStatus = await handleWanted(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
        } else {
        toast(`Sign in to save bands!`);
    }
  }

  const prepareSeen = async (band) => {
    if(currentUser.isAuthenticated) {
    const bandStatus = await handleSeen(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
        } else {
        toast(`Sign in to save bands!`);
    }
  }

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
               <Typography>{statusText}</Typography>
               <div className="dropDown">
                 <Typography onClick={() => prepareWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                 <Typography onClick={() => prepareSeen(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
               </div>           
             </div>
             <div className="description">
               <Typography>{data.artist.bio.summary}</Typography>
               <br />
             </div>
             <ToastContainer/>
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