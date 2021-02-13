import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { LatestUpdates } from "./LatestUpdates";
import {checkStatus, handleWanted, handleSeen} from "../../utils/BandStatus";
import { UserContext } from "../../shared/UserContext";
import {Button, TextField, Typography, Grid,
Card, CardContent} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BrowseView.css";


const BrowseView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("none");
  const [statusText, setStatusText] = useState("Not listed");
  const [showFeed, setShowFeed] = useState(true);


useEffect(() => {
      if(currentUser && currentUser.user) {
           if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
      }
    }

    setSearch("");
    
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
      baseURL: `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
    });
    return BandAPI.get();
  };

  const fetchData = () => {
     if (search) {
      setShowFeed(false);
      currentUser.setShowFeed(false);
      searchForBand(search)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }
   };

   const handleGoBack = () => {
     setShowFeed(true);
     setSearch('');
     currentUser.setShowFeed(true);
   }

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
                    <Typography>Showing results for: {search}</Typography>
                    <Typography onClick={() => viewBand(data.artist.name)} className="preview">{data.artist.name}</Typography>
                    {data.artist.tags.tag[0] &&<Typography onClick={() => viewBand(data.artist.name)}>{data.artist.tags.tag[0].name}</Typography>}
                    <div className={status}>
                        <Typography>{statusText}</Typography>
                        <div className="dropDown">
                            <Typography onClick={() => prepareWanted(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Want to see</Typography>
                            <Typography onClick={() => prepareSeen(data.artist.name)} style={{color:"rgb(217, 224, 205)"}}>Seen</Typography>
                        </div>       
                    </div>
                    <Button 
                    color="primary"
                    variant="contained"  
                    onClick={() => handleGoBack()}
                    >Back to feed</Button>   
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
            <div className="searchDiv">
                <Typography variant="h6" style={{
                          display:"inline",
                            marginBottom: "5vh",
                            marginTop: "3vh",
                            marginLeft: "5vw",
                            marginRight: "5vw"
                           
                          }}>Find artist</Typography>
                <TextField
                    variant="outlined"
                    color="secondary"
                    style={{
                          display:"inline",
                            marginBottom: "5vh",
                            marginTop: "5vh",
                            height: "5vh"
                            
                          }}
                    value={search}
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
                  onClick={() => fetchData()}><SearchIcon/></Button>
            </div>
          {data.artist !== undefined && !showFeed && !currentUser.showFeed ? displayData() : <LatestUpdates />}   
          </CardContent>
        </Card>
        </Grid>
    </div>
  );
};

export default BrowseView;