import React from "react";
import "./Forms.css";

export const BandForm = () => {
  return (
    <div className="formWrapper">
      <h3>
        No artist found. Enter info and press "add" to add it to out database.
      </h3>
      <span>Bandname </span>
      <input />
      <br />
      <span>Image URL </span>
      <input />
      <br />
      <span>Description </span>
      <input />
      <br />
      <span>Genre </span>
      <input />
      <br />
    </div>
  );
};
