import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import RoutingPath from "../../routes/RoutingPath";
import Axios from "axios";
import { LatestAdded } from "./defaultView/LatestAdded";
import {BandPreview} from '../band/BandPreview'
import { BandForm } from "../forms/BandForm";
import {Card, CardContent, CardActions, Container} from '@material-ui/core';
// import "./BrowseView.css";

const BrowseView = () => {
  // const history = useHistory();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("Cher");
  const [bands, setBands] = useState([]);

//todo: show random/newly added to db/newly added to someones lists/most popular bands instead of hard coded json
    useEffect(() => {
      // setBands(Bands.getBands());
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
        <div>
          <div className="latestAddedContainer">
              <BandPreview
                key={data.artist}
                name={data.artist.name}
                id={data.artist.mbid}
                genre={data.artist.tags.tag[0].name}
              />
          </div>
        </div>
      );
    } else {
      return <BandForm />;
    }
  };
  return (
    <div className="browseViewWrapper">
      <Container>
        <Card>
        <CardContent className="searchDiv">
          <span>Search: </span>
          <input onChange={(event) => setSearch(event.target.value)} />
          <CardActions>
            <button onClick={() => fetchData()}>Find artist</button>
          </CardActions>
        </CardContent>
        <CardContent>
          {data.artist !== undefined ? displayData() : <LatestAdded />}
        </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default BrowseView;
/*
if the search returns no results, show form for entering new band into database */