// import http from '../BandAPI'
import React, { useEffect} from "react";
import Axios from "axios";


const searchForBand = (userSearch) => {
  // const [userSearch, setUserSearch] = useEffect()
  const BandAPI = Axios.create({
    baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${userSearch}&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
  });
  // return BandAPI.get(`/${userSearch}`)
  return BandAPI.get();
};





export default {
    searchForBand
};