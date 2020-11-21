import React, { useContext, useState } from "react";
import { UserContext } from "../shared/global/provider/UserProvider";
import "./BandView.css";
import ProfilePic from "../shared/images/profilePic.jpg";
import band1 from "../shared/images/band1.jpg";
import band2 from "../shared/images/band2.jpg";
import band3 from "../shared/images/band3.jpg";

// export const BandView = (bandname, imageUrl, description, genre) => {
export const BandView = () => {
  const [bandname, setBandname] = useState("Frantic Amber");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum!"
  );
  const [genre, setGenre] = useState("Melodic Death Metal");

  const addToWanted = () => {
    console.log("add to wanted");
  };
  const addToSeen = () => {
    console.log("add to seen");
  };

  return (
    <div className="bandViewWrapper">
      <span className="bandname">{bandname}</span>
      <img src={band2} alt="profile pic" className="profilePic" width="200px" />
      <div className="statusWrapper">
        <span onClick={() => addToWanted()}>Want to see</span>
        <div className="dropDown">
          <span onClick={() => addToSeen()}>Seen</span>
        </div>
      </div>
      <div className="description">
        <span>{description}</span>
        <br />
      </div>
      <span className="genre">{genre}</span>
    </div>
  );

  
};


