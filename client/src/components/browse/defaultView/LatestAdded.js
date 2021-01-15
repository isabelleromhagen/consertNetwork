import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../../routes/RoutingPath";
// import { Result } from "../components/result/Result.js";
// import Bands from "../../../shared/data/Bands";
import {BandPreview} from '../../band/BandPreview';
// import { Card, CardContent, CardActions, Button, Typography } from "@material-ui/core";
import "../BrowseView.css";

export const LatestAdded = () => {
  const history = useHistory();
  const [search, setSearch] = useState();
  const [bands, setBands] = useState([]);

    useEffect(() => {
      // setBands(Bands.getBands());
    }, []);

  return (
    <div className="contentDiv">
      <h1>Latest added</h1>
      <div className="itemsContainer">
        {bands.map((band) => (
          <BandPreview
            key={band.bandid}
            name={band.name}
            id={band.bandid}
            genre={band.genre}
          />
        ))}
      </div>
    </div>
  );
};