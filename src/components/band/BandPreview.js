import React from "react";
import { useHistory } from "react-router-dom";
import '../browse/BrowseView.css'

export const BandPreview = ({ id, name, genre }) => {
  const history = useHistory();

  // const viewBand = (id) => {
  //   history.push(`/band/${id}`);
  // };

  const viewBand = (id) => {
    history.push(`/band/${id}`);
  };

  const addToWanted = () => {
    console.log("add to wanted");
  };
  const addToSeen = () => {
    console.log("add to seen");
  };
  return (
    <div className="bandPreviewWrapper">
      <span onClick={() => viewBand(name)}>{name}</span>
      <span onClick={() => viewBand(name)}>{genre}</span>
      <div className="statusWrapper">
        <span onClick={() => addToWanted()}>Want to see</span>
        <div className="dropDown">
          <span onClick={() => addToSeen()}>Seen</span>
        </div>
      </div>
    </div>
  );
};
