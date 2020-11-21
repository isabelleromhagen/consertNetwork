import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";
import "./BrowseView.css";

export const CommunityView = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  const fetchData = () => {
    //search database for users
  };
  const displayData = () => {
    if (data) {
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Following</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={data.artist}
              onClick={() => history.push(RoutingPath.profileView)}
            >
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
        <button onClick={() => fetchData()}>Find user</button>
        <div className="contentDiv">{displayData()}</div>
      </div>
    </div>
  );
};
