import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import RoutingPath from "../../routes/RoutingPath";
// import '../Profile.css'
import { Card, CardContent, CardHeader, Typography, Button, TextField, Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingsView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const [image, setImage] = useState("");
  const [info, setInfo] = useState({username: currentUser.user.username, bio: currentUser.user.bio, fileId: currentUser.user.fileId, password: "", password2: "", want: want, seen: seen, token: "", _id: currentUser.user._id});
  
  const [caption, setCaption] = useState("");
  const [passwordToDelete, setPasswordToDelete] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
    

   const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value});
  }

  const update = (e) => {
    e.preventDefault();
    console.log('updating: ', info);
      UserService.updateCurrentUser(info).then(data => {
          currentUser.setUser(info);
          toast(`Updated info!`);
      })
  }

  const uploadImage = (e) => {
    // e.preventDefault();
    let imageData = new FormData();
    // imageData.append('username', currentUser.user.username);
    imageData.append('file', image);
    imageData.append('caption', caption);
    console.log('formdata: ', imageData);
    UserService.uploadImage(imageData).then(data => {
      console.log('data: ', data);
      console.log('file id: ', data.image.fileId);
      toast('Image uploaded!');
      
      setInfo({...info, fileId: data.image.fileId});
    })
  }

  const updatePassword = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, currentPassword: currentPassword, newPassword1: newPassword1, newPassword2: newPassword2})
    UserService.updatePassword(data)
    toast(`Updated password!`);
  }

  const deleteUser = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, password: passwordToDelete})
    UserService.deleteUser(data)
        currentUser.setUser(null)
        currentUser.setIsAuthenticated(false)
        currentUser.setToken(null)
        history.push(RoutingPath.signInView)
        toast(`User deleted`);
  }

  useEffect(() => {
      console.log('current user: ', currentUser);
      if(currentUser.user.want) {
        let wantArr = Array.from(currentUser.user.want);
        let seenArr = Array.from(currentUser.user.seen);
        setInfo({username: currentUser.user.username, bio: currentUser.user.bio, want: wantArr, seen: seenArr, token: currentUser.token, _id: currentUser.user._id});
       
      }
     
  }, []);
    return (
      <div className="settingsWrapper">
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card style={{ padding:'10vh', width: "70vw"}}>
          <CardContent>
          <CardHeader title="Settings"/>
          <form onSubmit={update}>
              <Typography>Username</Typography>
              <TextField 
                name="username"
                variant="outlined"
                color="secondary"
                label="Username"
                onChange={onChange}
                value={info.username}
                style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      

                    }} />
              <Typography>Biography</Typography>
              <TextField 
                name="bio"
                variant="outlined"
                color="secondary"
                label="Biography"
                onChange={onChange}
                value={info.bio}
                style={{
                    display:"block",
                      fontSize: 14,
                      marginBottom: "5vh",
                      marginTop: "5vh"
                    }} />
              <input
                type="file"
                name="file"
                onChange={(event) => setImage(event.target.files[0])}
                />
              <TextField 
                name="caption"
                variant="outlined"
                color="secondary"
                label="Caption"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
                style={{
                    display:"block",
                      fontSize: 14,
                      marginBottom: "5vh",
                      marginTop: "5vh"
                    }} />
              <Button
                size="large" 
                style={{
                  fontSize: 14, 
                  marginBottom: "5vh",
                  marginTop: "2vh",
                  marginLeft: "4vw"
                  }}
                color="primary"
                variant="contained"
                onClick={() => uploadImage()}
              >Upload</Button>
              <Button
                size="large" 
                style={{
                  fontSize: 14, 
                  marginBottom: "5vh",
                  marginTop: "2vh",
                  marginLeft: "4vw"
                }}
                color="primary"
                variant="contained"
                type="submit">Update</Button>
          </form>
          <ToastContainer />
   
        <div>
          <form onSubmit={updatePassword}>
              <Typography variant="h2">Change password</Typography>
              <Typography>Enter current password</Typography>
              <TextField
              name="currentPassword"
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              onChange={e => setCurrentPassword(e.target.value)}
              value={currentPassword}
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                    }}
                />
              <Typography>New password</Typography>
              <TextField
              name="newPassword1"
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              onChange={e => setNewPassword1(e.target.value)}
              value={newPassword1}
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                    }}
                />
              <Typography>Repeat new password</Typography>
             <TextField
              name="newPassword2"
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              onChange={e => setNewPassword2(e.target.value)}
              value={newPassword2}
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                    }}
                />
              <Button 
              size="large" 
              style={{
              fontSize: 14, 
              marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "2vw"
            }}
              color="primary"
              variant="contained"
              type="submit">Update Password</Button>
          </form>
        </div>
        <div>
          <Typography variant="h2">Delete account</Typography>
          <Typography>Enter password</Typography> <br />
          <TextField
              
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              onChange={e => setPasswordToDelete(e.target.value)}
              value={passwordToDelete}
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                    }}
                />
          <Button 
          size="large" 
              style={{
              fontSize: 14, 
              marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "4vw"
            }}
              color="primary"
              variant="contained"
              onClick={deleteUser}>Delete</Button>
        </div>
        </CardContent>
        </Card>
      </Grid>
      </div>
    );
}

export default SettingsView;


              // <Typography>Profile picture URL</Typography>
              // <TextField 
              //   name="pictureUrl"
              //   variant="outlined"
              //   color="secondary"
              //   label="Picture url"
              //   onChange={onChange}
              //   value={info.pictureUrl}
              //   style={{
              //       display:"block",
              //         fontSize: 14,
              //         marginBottom: "5vh",
              //         marginTop: "5vh"
              //       }} />