import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import FeedService from '../../shared/services/FeedService';
import "./BrowseView.css";
import {Post} from "./Post"

export const LatestUpdates = () => {
  const [feed, setFeed] = useState([]);

useEffect(() => {
    FeedService.getFeed().then(data => {
      setFeed(data);
    }) 
  }, []);

return (
    <div className="contentDiv">
      <Typography variant="h2">Latest updates</Typography>
          {feed.map((post) => 
              <Post key={post._id} post={post}/>)}
    </div>
  );
};