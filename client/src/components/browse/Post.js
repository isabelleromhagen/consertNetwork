import React, { useEffect, useState, useContext } from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import FeedService from '../../shared/services/FeedService';
import {checkStatus, handleWanted, handleSeen} from "../../utils/BandStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Post = (post) => {
    const history = useHistory();
    const currentUser = useContext(UserContext);
    const [status, setStatus] = useState("none");
    const [statusText, setStatusText] = useState("Not listed");
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newLike, setNewLike] = useState({});
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        let userStatus
        if(post.post && post.post.username && currentUser && currentUser !== undefined && currentUser.user) {              
            userStatus = checkStatus(post.post.bandname, currentUser)
            setStatus(userStatus[0]);
            setStatusText(userStatus[1]);         
        }
        if(post.post.likes) {
            setLikes(post.post.likes.length);
        }
        if(post.post.comments) {
            setComments(post.post.comments);
        }

    }, [])

    const viewProfile = (id) => {
        currentUser.setProfile({});
        history.push(`/profile/${id}`);
    }
    const viewBand = (name) => {
        history.push(`/band/${name}`);
    };

    const prepareWanted = async (band) => {
        if(currentUser.isAuthenticated
            ) {
            const bandStatus = await handleWanted(band, currentUser);
                setStatus(bandStatus[0])
                setStatusText(bandStatus[1])
            } else {
                toast(`Sign in to save bands!`);
            }
        }

    const prepareSeen = async (band) => {
        if(currentUser.isAuthenticated
            ) {
        const bandStatus = await handleSeen(band, currentUser);
            setStatus(bandStatus[0])
            setStatusText(bandStatus[1])
            } else {
            toast(`Sign in to save bands!`);
        }
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

    const handleLike = async () => {
        if(currentUser.isAuthenticated) {
            const likeData = {"_id":post.post._id, "userId":currentUser.user._id};
            setNewLike(likeData);
            const updatedLikes = await FeedService.toggleLike(likeData);
            setLikes(updatedLikes.length);
        } else {
            toast(`Sign in to like posts!`);
        }
    }


    const submitComment = async (e) => {
        e.preventDefault();
        if(currentUser.isAuthenticated) {
            const commentData = {"text":newComment, "_id":post.post._id, "userId":currentUser.user._id};
            const updatedComments = await FeedService.addComment(commentData);
            setComments(updatedComments);
            setNewComment('')
        } else {
            toast(`Sign in to comment!`);
        }
    }
    return (
        <div className="bandPreviewWrapper">
         <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
                {<Typography onClick={() => viewProfile(post.post.userId)} className="preview">{post.post.username}</Typography>}
                {<Typography>{post.post.bandStatus}</Typography>}
                {<Typography onClick={() => viewBand(post.post.bandname)} className="preview">{post.post.bandname}</Typography>}
                <div className={currentUser && status} style={{marginLeft:"10vh"}}>
                      <Typography>{statusText}</Typography>
                      <div className="dropDown">
                          <Typography onClick={() => prepareWanted(post.post.bandname)}>Want to see</Typography>
                          <Typography onClick={() => prepareSeen(post.post.bandname)}>Seen</Typography>
                      </div>           
                </div>
                <div>
                    <Button 
                  
                  type="submit"
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleLike()}>{<ThumbUpIcon/>}</Button>
                <Typography style={{display:"inline", marginLeft: "1vw", marginBottom:"3vh", }}>Likes: {likes}</Typography>
                </div>
                  
                <Typography style={{marginTop: "3vh"}}>Comments:</Typography>
                {comments && comments.map((comment) => 
                  (<div className="commentDiv" key={comment._id}>
                      <Typography onClick={() => viewProfile(comment.userId)} className="preview">{comment.username}</Typography>
                      <Typography> commented: </Typography>
                      <Typography>{comment.text}</Typography>
                      <Typography>{formatDate(comment.date)}</Typography>
                    </div>)
                   )}
                  <form onSubmit={submitComment} className="commentForm">
                    <TextField
                      name="comment"
                      variant="outlined"
                      label="comment"
                      color="secondary"
                      value={newComment}
                      style={{
                          display:"block",
                          fontSize: 14,
                          marginBottom: "5vh",
                          marginTop: "2vh",
                        }}
                        onChange={e => setNewComment(e.target.value)}
                />
                <Button 
                  type="submit"
                  color="primary"
                  variant="contained"
                  >{<CommentIcon/>}</Button>
                </form>
                <ToastContainer/>
                </Grid>
              </div>
      )
}