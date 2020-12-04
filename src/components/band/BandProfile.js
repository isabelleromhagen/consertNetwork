import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { WantContext } from "../../shared/global/provider/WantContext";
import { SeenContext } from "../../shared/global/provider/SeenContext";
import Users from "../../shared/data/Users";
import Bands from "../../shared/data/Bands";

export const BandProfile = (props) => {

     const { bandid } = props.match.params;
     console.log(props.match.params);

     const [bandData, setBandData] = useState(Bands.getBands());
     const [band, setBand] = useState({});

    useEffect(() => {
        setBand(bandData.find((band) => band.bandid.toString() === bandid));
        console.log(bandData);
    }, []);

    return (
      <div className="bandViewWrapper">
        <span className="bandname">{band.name}</span>
        <span className="genre">{band.genre}</span>
      </div>
    );
}

//   const [bandname, setBandname] = useState("Frantic Amber");
//   const [description, setDescription] = useState(
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum!"
//   );
//   const [genre, setGenre] = useState("Melodic Death Metal");

//   const addToWanted = () => {
//     console.log("add to wanted");
//   };
//   const addToSeen = () => {
//     console.log("add to seen");
//   };



//    <div className="bandViewWrapper">
//      <span className="bandname">{bandname}</span>
//      <img src={band2} alt="profile pic" className="profilePic" width="200px" />
//      <div className="statusWrapper">
//        <span onClick={() => addToWanted()}>Want to see</span>
//        <div className="dropDown">
//          <span onClick={() => addToSeen()}>Seen</span>
//        </div>
//      </div>
//      <div className="description">
//        <span>{description}</span>
//        <br />
//      </div>
//      <span className="genre">{genre}</span>
//    </div>;
