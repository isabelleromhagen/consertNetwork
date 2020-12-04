import React from "react";
import { useHistory } from "react-router-dom";

export const BandPreview = ({ id, name, genre }) => {
  const history = useHistory();

  const viewBand = (id) => {
    history.push(`/band/${id}`);
  };
  return (
    <div>
      <span>{name}</span>
      <span>{genre}</span>
      <button onClick={() => viewBand(id)}>View band</button>
    </div>
  );
};
