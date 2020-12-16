import React, {useContext, useState, useEffect} from 'react'
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { WantContext } from "../../shared/global/provider/WantContext";
import { SeenContext } from "../../shared/global/provider/SeenContext";
import BandService from '../../shared/api/service/BandService';
import img from '../../shared/images/music.svg'
import './Band.css'

const BandProfile = (props) => {

  const bandname = props.match.params;
  const [search, setSearch] = useState(bandname.bandid);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum!"
  );
  const addToWanted = () => {
    console.log("add to wanted");
  };
  const addToSeen = () => {
    console.log("add to seen");
  };

  // const contactBandService = async () => {
  //   try {
  //     console.log("search: ", search);
  //     // const result = await BandService.fetchData(search);
  //     const result = await BandService.BandAPI(search);
  //     console.log('result: ', result);
  //     setData(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
    
  // }

  useEffect(() => {
    // contactBandService()
    fetchData()
  }, []);


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
     console.log(data.artist.bio.summary);
     if (data && data.artist !== undefined) {
       return (
         <div>
           <div className="bandViewWrapper">
             <span className="bandname">{data.artist.name}</span>
             <img
               src={img}
               alt="profile pic"
               className="profilePic"
               width="200px"
             />
             <span className="genre">{data.artist.tags.tag[0].name}</span>
             <div className="statusWrapper">
               <span onClick={() => addToWanted()}>Want to see</span>
               <div className="dropDown">
                 <span onClick={() => addToSeen()}>Seen</span>
               </div>
             </div>
             <div className="description">
               <span>{data.artist.bio.summary}</span>
               <br />
             </div>
           </div>
         </div>
       );
     } else {
       return <div>oops, something went wrong while attempting to display data...</div>;
     }
   };
  return (
    <div className="bandViewWrapper">
      {data && data.artist !== undefined ? (
        displayData()
      ) : (
        <div>oops, something went wrong...</div>
      )}
    </div>
  );
}

export default BandProfile;

//const [description, setDescription] = useState(
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorum, excepturi animi itaque libero soluta eveniet minus? Atque perferendis officia repellendus! Excepturi possimus quibusdam, minus repellendus velit consequuntur? Autem, earum!"
//   );
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
