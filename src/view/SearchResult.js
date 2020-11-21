import React, { useState } from "react";
import { Result } from "../components/result/Result.js";
import bandData from "../shared/bands.json";
import BandService from '../shared/api/service/BandService'
import "./BrowseView.css";

export const SearchResult = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState()

  const fetchData = () => {
      BandService.searchForBand(search)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }
const displayData = () => {
    if(data) {
        return(
           <tbody>
             {bandData.map((result, index) => {
               return (
                 <tr key={result.name}>
                   <td>
                     <span>{result.name}</span>
                   </td>
                   <td>
                     <img
                       src={result.pictureUrl}
                       alt={result.name}
                       key={result}
                     />
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
        )
    }
}
  return (
      <div className="contentDiv">
        <span>Results for {search} </span>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Genre</th>
              <th>Seen</th>
            </tr>
          </thead>
        {displayData()}
        </table>
      </div>
  );
};