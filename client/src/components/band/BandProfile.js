import React, {useContext, useState, useEffect} from 'react'
import Axios from "axios";
import { UserContext } from "../../shared/global/provider/UserContext";
import UserService from "../../shared/api/service/UserService";
import { useHistory } from "react-router-dom";
import img from '../../shared/images/music.svg'
import './Band.css'

const BandProfile = (props) => {
  const currentUser = useContext(UserContext);
  const bandname = props.match.params;
  const [search, setSearch] = useState(bandname.bandid);
  const [data, setData] = useState([]);
 
    const handleWanted = (band) => {
      console.log('band to handle ', band);
      if (!currentUser.want) {
        currentUser.want = [];
      }
      console.log("in handle wanted: ", currentUser.want);
      if (currentUser.want.includes(band)) {
        currentUser.want = currentUser.want.filter((item) => item !== band);
        console.log("in if incl, updated: ", currentUser.want);
      } else {
        //if band is on seen list, remove and update seen
        if (currentUser.seen.includes(band)) {
          currentUser.seen = currentUser.seen.filter((item) => item !== band);
          console.log("in if incl, updated: ", currentUser.seen);
          UserService.updateCurrentUser(
            currentUser.token,
            currentUser.seen
          ).then((data) => {
            console.log("got from us", data);
          });
        }
        currentUser.want.push(band);
        console.log("in else, updated: ", currentUser.want);
      }
      console.log("token and array going into db:", currentUser.token, ' ', currentUser.want);
      UserService.updateCurrentUser(currentUser.token, currentUser.want).then(
        (data) => {
          console.log("got from us", data);
        }
      );
    };

   const handleSeen = (band) => {
     if (!currentUser.seen) {
       currentUser.seen = [];
     }
     console.log("in handle seen: ", currentUser.seen);
     if (currentUser.seen.includes(band)) {
       currentUser.seen = currentUser.seen.filter((item) => item !== band);
       console.log("in if incl, updated: ", currentUser.seen);
     } else {
       //if band is on want list, remove and update want
        if (currentUser.want.includes(band)) {
          currentUser.want = currentUser.want.filter((item) => item !== band);
          console.log("in if incl, updated: ", currentUser.seen);
           UserService.updateCurrentUser(
             currentUser.token,
             currentUser.want
           ).then((data) => {
             console.log("got from us", data);
           });
        }
        //add to seen
       currentUser.seen.push(band);
       console.log("in else, updated: ", currentUser.seen);
     }
     UserService.updateCurrentUser(currentUser.token, currentUser.seen).then(
       (data) => {
         console.log("got from us", data);
       }
     );
   };

  useEffect(() => {
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
               <span onClick={() => handleWanted(data.artist.name)}>Want to see</span>
               <div className="dropDown">
                 <span onClick={() => handleSeen(data.artist.name)}>Seen</span>
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