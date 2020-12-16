// import http from '../BandAPI'
import React, { useState} from "react";
import Axios from "axios";


// const searchForBand = (userSearch) => {
//   // const [userSearch, setUserSearch] = useEffect()
//   const BandAPI = Axios.create({
//     baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${userSearch}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
//   });
//   // return BandAPI.get(`/${userSearch}`)
//   return BandAPI.get();
// };

//original code with then
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

//try with async await
//  const fetchData = async ({search}) => {
//   try {
//     console.log('search in band service: ', search);
//     const result = await searchForBand(search);
//     console.log(result)
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

//try with interceptors
//  const BandAPI = (search) => Axios.create({
//    baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
//  });

//  BandAPI.interceptors.response.use(
//    res => res,
//    err => {
//      if(err) {
//        console.error(err);
//      }
//      return Promise.reject(err);
//    }
//  )

export default {
   fetchData
};