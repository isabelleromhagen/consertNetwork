import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
// import { Result } from "../components/result/Result.js";
// import bandData from "../shared/bands.json";
// import {BandService} from "../shared/api/service/BandService";
import Axios from "axios";
// import { SearchResult } from "./SearchResult";
import { LatestAdded } from "./defaultView/LatestAdded";
import { BandForm } from "../forms/BandForm";
import "./BrowseView.css";

export const BrowseView = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("Cher");

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
      // console.log("name: ", data.artist.tags.tag[0].name);
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Genre</th>
                <th>Seen</th>
              </tr>
            </thead>
            <tbody>
              <tr
                key={data.artist}
                onClick={() => history.push(RoutingPath.bandView)}
              >
                <td>
                  <span>{data.artist.name}</span>
                </td>
                <td>
                  <img
                    src={data.artist.image[0]["#text"]}
                    alt={data.artist.name}
                    key={data}
                  />
                </td>
                <td>
                  <span>{data.artist.tags.tag[0].name}</span>
                </td>
                <td>
                  <button>Seen</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <BandForm />;
    }
  };

  return (
    <div className="browseViewWrapper">
      <div className="searchDiv">
        <span>Search: </span>
        <input onChange={(event) => setSearch(event.target.value)} />
        <br />
        <button onClick={() => fetchData()}>Find artist</button>
        {data.artist !== undefined ? displayData() : <LatestAdded />}
      </div>
    </div>
  );
};

/*should show latest added/most popular/some other list as default. 
if the user enters something in the search bar and hits enter, header should be replaced by result + show the bands that came up in the search.
if the search returns no results, show form for entering new band into database */
