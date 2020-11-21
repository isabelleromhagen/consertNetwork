import React, { useState } from "react";
// import { Result } from "../components/result/Result.js";
// import bandData from "../shared/bands.json";
import BandService from "../shared/api/service/BandService";
// import { SearchResult } from "./SearchResult";
import { LatestAdded } from "./LatestAdded";
import "./BrowseView.css";

export const BrowseView = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  const fetchData = () => {
    BandService.searchForBand(search)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  const displayData = () => {
    if (data) {
      return (
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
            <tr key={data.artist}>
              <td>
                <span>{data.artist.name}</span>
              </td>
              <td>
                <img
                  src={data.artist.image}
                  alt={data.artist.name}
                  key={data.artist}
                />
              </td>
              <td>
                <span>{data.artist.summary}</span>
              </td>
              <td>
                <button>Seen</button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="browseViewWrapper">
      <div className="searchDiv">
        <span>Search: </span>
        <input onChange={(event) => setSearch(event.target.value)} />
        <br />
        <button onClick={() => fetchData()}>Find band</button>
        <div className="contentDiv">{displayData()}</div>
      </div>
      <LatestAdded />
    </div>
  );
};

/*should show latest added/most popular/some other list as default. 
if the user enters something in the search bar and hits enter, header should be replaced by result + show the bands that came up in the search.
if the search returns no results, show form for entering new band into database */


    //  {
    //    data.map((result, index) => {
    //      return (
    //        <tr key={result.name}>
    //          <td>
    //            <span>{result.name}</span>
    //          </td>
    //          <td>
    //            <img src={result.pictureUrl} alt={result.name} key={result} />
    //          </td>
    //          <td>
    //            <span>{result.genre}</span>
    //          </td>
    //          <td>
    //            <button>Seen</button>
    //          </td>
    //        </tr>
    //      );
    //    });
    //  }