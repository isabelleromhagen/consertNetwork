// import http from '../BandAPI'
import Axios from "axios";

const searchForBand = (userSearch) => {
  // return BandAPI.get(`/${userSearch}`)
  return BandAPI.get(`${userSearch}`);
};

const BandAPI = Axios.create({
  baseURL: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Metallica&api_key=ffb559cf8f997faea46f5ea67c7d98de&format=json`,
});



export default {
    searchForBand
}