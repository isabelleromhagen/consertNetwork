import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { LatestAdded } from "./LatestAdded";
import {checkStatus, handleWanted, handleSeen} from "../../utils/BandStatus";
import { UserContext } from "../../shared/UserContext";
import {Button, TextField, Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        if (data && data.artist !== undefined && currentUser && currentUser !== undefined && currentUser.user) {
            let stat = checkStatus(data.artist.name, currentUser)
            setStatus(stat[0])
            setStatusText(stat[1])
    }
  }, [status, data]);

    const viewBand = (name) => {
    history.push(`/band/${name}`);
  };

  const prepareWanted = async (band) => {
    if(currentUser.isAuthenticated) {
      const bandStatus = await handleWanted(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
    }
     else {
        toast(`Sign in to save bands!`);
    }
  }

  const prepareSeen = async (band) => {
    if(currentUser.isAuthenticated) {
    const bandStatus = await handleSeen(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
    }
      else {
        toast(`Sign in to save bands!`);
    }
  }

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
          <div>
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '40vh', }}>
                    <Typography onClick={() => viewBand(data.artist.name)} className="preview">{data.artist.name}</Typography>
                    {data.artist.tags.tag[0] &&<Typography onClick={() => viewBand(data.artist.name)}>{data.artist.tags.tag[0].name}</Typography>}
                    <div className={status}>
                        <Typography>{statusText}</Typography>
                        <div className="dropDown">
                            <Typography onClick={() => prepareWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                            <Typography onClick={() => prepareSeen(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
                        </div>           
                    </div>
                  <ToastContainer/>
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
        <Card style={{ padding:'10vh', width: "70vw" }}>
        <CardContent>
      
          <CardHeader title="Search: "/>
          <TextField
              variant="outlined"
              color="secondary"
              style={{
                    display:"block",
                      fontSize: 14,
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      
                    }}
              onChange={(event) => setSearch(event.target.value)}
                />
            <Button 
            size="large" 
            style={{
              fontSize: 14,
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