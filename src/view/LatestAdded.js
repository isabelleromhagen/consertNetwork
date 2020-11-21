import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";
import { Result } from "../components/result/Result.js";
import bandData from "../shared/bands.json";
import "./BrowseView.css";

export const LatestAdded = () => {
  const history = useHistory();
  const [search, setSearch] = useState();
  // const [result, setResult] = useState()
  // const results = [Result, Result, Result];
  // const mappedResults = bandData.map((band) => (
  //   <img src={band} alt="band" className="bandPic" />
  // ));
  return (
    <div className="contentDiv">
      <span>Latest added</span>
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
          {bandData.map((result, index) => {
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
                  <button>Seen</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
