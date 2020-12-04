import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../../routes/RoutingPath";
// import { Result } from "../components/result/Result.js";
import Bands from "../../../shared/data/Bands";
import {BandPreview} from '../../band/BandPreview';
import "../BrowseView.css";

export const LatestAdded = () => {
  const history = useHistory();
  const [search, setSearch] = useState();
  const [bands, setBands] = useState([]);

    useEffect(() => {
      setBands(Bands.getBands());
    }, []);

  const addToWanted = () => {
    console.log("add to wanted");
  };
  const addToSeen = () => {
    console.log("add to seen");
  };
  // const [result, setResult] = useState()
  // const results = [Result, Result, Result];
  // const mappedResults = bandData.map((band) => (
  //   <img src={band} alt="band" className="bandPic" />
  // ));
  return (
    <div className="contentDiv">
      <span>Latest added</span>
        <div>
          {bands.map((band) => (
            <BandPreview
              key={band.id}
              name={band.name}
              id={band.id}
              genre={band.genre}
            />
          ))}
        </div>
    </div>
  );
};

/**    {bandData.map((result, index) => {
            return (
              <tr
                onClick={() => history.push(RoutingPath.bandView)}
                key={result.name}
              >
                <td>
                  <span>{result.name}</span>
                </td>
                <td>
                  <img src={result.pictureUrl} alt={result.name} key={result} />
                </td>
                <td>
                  <span>{result.genre}</span>
                </td>
                <td>
                  <div className="statusWrapper">
                    <span onClick={() => addToWanted()}>Want to see</span>
                    <div className="dropDown">
                      <span onClick={() => addToSeen()}>Seen</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })} */
