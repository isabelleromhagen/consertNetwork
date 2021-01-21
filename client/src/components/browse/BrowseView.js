import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { LatestAdded } from "./LatestAdded";
import {checkStatus} from "../../utils/BandStatus";
import { UserContext } from "../../shared/UserContext";
import UserService from '../../shared/services/UserService';
import FeedService from '../../shared/services/FeedService';
import {Button, TextField, Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import "./BrowseView.css";


const BrowseView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("Cher");
  const [status, setStatus] = useState("none");
  const [statusText, setStatusText] = useState("Not listed");


    useEffect(() => {
      if(currentUser && currentUser.user) {
           if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
      }
      }
    
    }, []);

    useEffect(() => {
        if (data && data.artist !== undefined && currentUser && currentUser !== undefined) {
            let stat = checkStatus(data.artist.name, currentUser)
            setStatus(stat[0])
            setStatusText(stat[1])
    }
  }, [status, data]);

    const viewBand = (name) => {
    history.push(`/band/${name}`);
  };


    const handleWanted = (band) => {
      if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
      }
      //check is already marked as want, if true remove from want in currentUser
      if (currentUser.user.want.includes(band)) {
        currentUser.user.want = currentUser.user.want.filter((item) => item !== band);
      } else {
        //if band is on seen list, remove from seen in currentUser
        if (currentUser.user.seen.includes(band)) {
          currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band);
        }
        //add band to want in currentUser
        currentUser.user.want.push(band);
      }
      //update db with currentUser lists updated above
      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, want: currentUser.user.want, seen: currentUser.user.seen})
      UserService.updateCurrentUser(data).then(data => {
        let stat = checkStatus(band, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
        });

        const update = ({username:currentUser.user.username, bandStatus:"wants to see", bandname:band});
        console.log('update: ', update);
        FeedService.addToFeed(update).then(data => {

        })
    };

    const handleSeen = (band) => {
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
      }
      if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      //check is already marked as seen, if true remove from seen in currentUser
      if (currentUser.user.seen.includes(band)) {
        currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band);
      } else {
        //if band is on want list, remove from seen in currentUser
        if (currentUser.user.want.includes(band)) {
          currentUser.user.want = currentUser.user.want.filter((item) => item !== band);

        }
        //add band to seen in currentUser
        currentUser.user.seen.push(band);
      }
      //update db with currentUser lists updated above
      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, want: currentUser.user.want, seen: currentUser.user.seen})
      UserService.updateCurrentUser(data).then(data => {
        let stat = checkStatus(band, currentUser)
         setStatus(stat[0])
         setStatusText(stat[1])
        });

      const update = ({username:currentUser.user.username, bandStatus:"has seen", bandname:band});
        console.log('update: ', update);
        FeedService.addToFeed(update).then(data => {

        })
    };

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
          <div className="latestAddedContainer">
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
              <div className="bandPreviewWrapper">
                  <Typography onClick={() => viewBand(data.artist.name)} className="preview">{data.artist.name}</Typography>
                  {data.artist.tags.tag[0] &&<Typography onClick={() => viewBand(data.artist.name)}>{data.artist.tags.tag[0].name}</Typography>}
                  <div className={status}>
                      <Typography onClick={() => handleWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>{statusText}</Typography>
                      <div className="dropDown">
                          <Typography onClick={() => handleWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                          <Typography onClick={() => handleSeen(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
                      </div>           
                  </div>
                </div>
            </CardContent>
          </Card>
        </Grid>
        </div>
      );
    } else {
      return <div>No results </div>;
    }
  };
  return (
    <div className="wrapper">
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
      
          <CardHeader title="Search: "/>
          <TextField
              variant="outlined"
              color="secondary"
              style={{
                    display:"block",
                      fontSize: 14, //customize in px
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      

                    }}
              onChange={(event) => setSearch(event.target.value)}
                />
            <Button 
            size="large" 
            style={{
              fontSize: 14, //customize in px
              marginBottom: "5vh",
              marginTop: "2vh",
              marginLeft: "3vw"
            }}
            color="primary"
            variant="contained"
            onClick={() => fetchData()}>Find artist</Button>
      
          {data.artist !== undefined ? displayData() : <LatestAdded />}   
          </CardContent>
        </Card>
        
        </Grid>
    </div>
  );
};

export default BrowseView;