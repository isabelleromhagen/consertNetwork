// import http from '../BandAPI'
import React, { useState} from "react";
import Axios from "axios";


 const searchForBand = (search) => {
    console.log("search in band service: ", search);
   const BandAPI = Axios.create({
     baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
   });
   return BandAPI.get();
 };

 const fetchData = ({search}) => {
   
   if (search) {
     searchForBand(search)
       .then((response) => (response.data))
       .catch((error) => console.log(error));
   }
  
 };



export default {
   fetchData
};