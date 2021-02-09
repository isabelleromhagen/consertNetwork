import React, { useState, useEffect } from "react";
import UserService from '../../shared/services/UserService';
import "../browse/BrowseView.css";
import { ProfilePreview } from "../profile/ProfilePreview";
import {
  Card, Grid, CardHeader, CardContent,
  Button, TextField, Typography
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


const CommunityView = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    UserService.getUsers().then(data => {
      setUsers(data);
    })
  }, []);

  const fetchData = () => {
     if (search) {
      UserService.getUserByUsername(search).then(data => {
          setSearchResult(data);
    })
    }

  };
  const displayData = () => {
    if (searchResult) {
      return (
        <div>
        { searchResult.username && searchResult.username !== "" &&
           <ProfilePreview
                  key={searchResult._id}
                  name={searchResult.username}
                  id={searchResult._id}
                />}
        </div>
      );
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
              onChange={(event) => setSearch(event.target.value)} />
              <Button 
              size="large" 
              style={{
                display: "inline",
                marginBottom: "5vh",
                marginTop: "1vh",
                marginLeft: "3vw",
                fontSize: 14
              }}
              color="primary"
              variant="contained"
              onClick={() => fetchData()}>{<SearchIcon/>}</Button>        
             <div className="contentDiv">{displayData()}</div>
          </CardContent>
          <div className="contentDiv">
            <Typography variant="h2">Current users</Typography>
            <div className="itemsContainer">
              {users.map((user) => (
                <ProfilePreview
                  key={user._id}
                  name={user.username}
                  id={user._id}
                  user={user}
                />
              ))}
            </div>
          </div>
        </Card>
  
      </Grid>
    </div>
  );
};

export default CommunityView;
