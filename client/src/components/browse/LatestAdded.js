import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import {checkStatus, handleWanted, handleSeen} from "../../utils/BandStatus";
import FeedService from '../../shared/services/FeedService';
import UserService from '../../shared/services/UserService'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BrowseView.css";

export const LatestAdded = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  const [status, setStatus] = useState("none");
  const [statusText, setStatusText] = useState("Not listed");
  const [newComment, setNewComment] = useState({text: "", _id:""});
  const [post, setPost] = useState({comments: [], _id:""});

const viewProfile = (id) => {
        history.push(`/profile/${id}`);
    }
const viewBand = (name) => {
    history.push(`/band/${name}`);
  };

useEffect(() => {
    FeedService.getFeed().then(data => {
      setFeed(data);
    })
    if (currentUser && currentUser.user && !currentUser.user.want) {
        currentUser.user.want = [];
      }
    if (currentUser && currentUser.user && !currentUser.user.seen) {
        currentUser.user.seen = [];
      }
    if (feed && feed[0]) {
        let stat = checkStatus(feed[0].bandname, currentUser)
          setStatus(stat[0])
          setStatusText(stat[1])
      }  
  }, []);

const prepareWanted = async (band) => {
    if(currentUser.isAuthenticated) {
      const bandStatus = await handleWanted(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
    } else {
        toast(`Sign in to save bands!`);
    }
  }

const prepareSeen = async (band) => {
    if(currentUser.isAuthenticated) {
    const bandStatus = await handleSeen(band, currentUser);
        setStatus(bandStatus[0])
        setStatusText(bandStatus[1])
        } else {
        toast(`Sign in to save bands!`);
    }
  }
 
const displayFeed = (post) => {
    let currentUserStatus
    if(post && post.username && feed && feed[0] !== undefined && currentUser && currentUser !== undefined && currentUser.user) {
      currentUserStatus = checkStatus(post.bandname, currentUser)
    }

const formatDate = (date) => {
  const commentDate = new Date(date);
  const currentDate = Date.now();
  const milliSeconds = currentDate - commentDate;
 
  if(Math.floor(milliSeconds/1000) < 60 ) {
    return "Less than a minute ago"
  }
  else if (Math.floor(milliSeconds/1000 < 3600 )) {
    const minutes = Math.floor((milliSeconds/1000)/60);
    return `${minutes} minutes ago`
  }
  else if (Math.floor(milliSeconds/1000 < 86400 )) {
    const hours = Math.floor((milliSeconds/1000)/60/60);
    return `${hours} hours ago`
  }
  else if (Math.floor(milliSeconds/1000 > 86400)) {
    const days = Math.floor((((milliSeconds/1000)/60)/60)/24);
    return `${days} days ago`
  }

}

const handleLike = (e) => {
  e.preventDefault();

  const data = {"_id":post._id, "userId":currentUser.user._id}
  console.log('like data: ', data);
  FeedService.toggleLike(data).then(data => {

  })
}

const submitComment = (e) => {
    e.preventDefault();
    const data = {"text":newComment.text, "_id":post._id, "userId":currentUser.user._id}
    FeedService.addComment(data).then(data => {
    })
  }
    if(post) {
      return (
        <div className="bandPreviewWrapper">
                {<Typography onClick={() => viewProfile(post.username)} className="preview">{post.username}</Typography>}
                {<Typography>{post.bandStatus}</Typography>}
                {<Typography onClick={() => viewBand(post.bandname)} className="preview">{post.bandname}</Typography>}
                <div className={currentUser && currentUserStatus && currentUserStatus[0]} style={{marginLeft:"0vh"}}>
                      <Typography>{currentUserStatus && currentUserStatus[1]}</Typography>
                      <div className="dropDown">
                          <Typography onClick={() => prepareWanted(post.bandname)}>Want to see</Typography>
                          <Typography onClick={() => prepareSeen(post.bandname)}>Seen</Typography>
                      </div>           
                </div>
                <Button size="small"
                  color="primary"
                  variant="contained"
                  onClick={(event) => handleLike(event)}>Like</Button>
                <Typography style={{display:"inline", marginLeft: "1vw"}}>Likes: {post.likes.length}</Typography>
                <Typography style={{marginTop: "3vh"}}>Comments:</Typography>
                {post.comments && post.comments.map((comment) => 
                  (<div className="commentDiv">
                      <Typography>{comment.username}</Typography>
                      <Typography> commented: </Typography>
                      <Typography>{comment.text}</Typography>
                      <Typography>{formatDate(comment.date)}</Typography>
                    </div>)
                   )}
                  <form onSubmit={submitComment}>
                    <TextField
                      name="comment"
                      variant="outlined"
                      label="comment"
                      color="secondary"
                      style={{
                          display:"block",
                          fontSize: 14,
                          marginBottom: "5vh",
                          marginTop: "2vh",
                        }}
                        onChange={(event) => setNewComment({text:event.target.value, _id:post._id})}
                />
                <Button type="submit"
                  color="primary"
                  variant="contained">Comment</Button>
                </form>
              </div>
      )
    }
}

return (
    <div className="contentDiv">
      <Typography variant="h2">Latest updates</Typography>
          {feed.map((post) => 
            displayFeed(post))}
            <ToastContainer/>
    </div>
  );
};