import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import RoutingPath from "../../routes/RoutingPath";
import { Card, CardContent, CardHeader, Typography, Button, TextField, Grid } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SettingsView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const [image, setImage] = useState("");
  const [info, setInfo] = useState({username: currentUser.user.username, bio: currentUser.user.bio, fileId: currentUser.user.fileId, password: "", password2: "", want: want, seen: seen, token: "", _id: currentUser.user._id});
  const [showSpinner, setShowSpinner] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
    

   const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value});
  }

  const update = (e) => {
    e.preventDefault();
    if(!info.fileId) {
      info.fileId = currentUser.user.fileId;
    }
      UserService.updateCurrentUser(info).then(data => {
          currentUser.setUser(info);
          toast(`Updated info!`);
      })
  }

  const deleteImage = (e) => {
    e.preventDefault();
      setShowSpinner(true);
    UserService.deleteImage(currentUser.user.fileId).then(data => {
      setShowSpinner(false);
      const noImage = "noImage"
      setInfo({...info, fileId: noImage});
    })
    
  }

  const uploadImage = (e) => {
    e.preventDefault();
    setShowSpinner(true);
    if(currentUser.user.fileId && currentUser.user.fileId !== 'noImage') {
      deleteImage(e);
    }
    
    let imageData = new FormData();
    imageData.append('file', image);
    UserService.uploadImage(imageData).then(data => {
      setShowSpinner(false);
      toast('Image uploaded!');
      toast("Don't forget to save your changes!");
      setInfo({...info, fileId: data.image.fileId});
    })
  }

  
  const updatePassword = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, currentPassword: currentPassword, newPassword1: newPassword1, newPassword2: newPassword2})
    UserService.updatePassword(data)
    update(e);
    toast(`Updated password!`);
  }

  const deleteUser = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, password: passwordToDelete})
    UserService.deleteUser(data)
        currentUser.setUser(null)
        currentUser.setIsAuthenticated(false)
        currentUser.setToken(null)
    UserService.deleteImage(currentUser.user.fileId)
        history.push(RoutingPath.signInView)
        toast(`User deleted`);
  }

  useEffect(() => {
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
          <form onSubmit={update} >
              <Typography style={{
                    
                      marginLeft: "5vw"

                    }}>Username</Typography>
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
                      marginLeft: "5vw"

                    }} />
              <Typography style={{
                    
                      marginLeft: "5vw"

                    }}>Biography</Typography>
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
                      marginTop: "5vh",
                      marginLeft: "5vw"
                    }} />
                  
                  <input
                type="file"
                name="file"
                style={{
                  width:"25vw",
                  fontFamily:"fontsource-roboto",
                  fontSize:"large",
                  marginLeft: "5vw"
                }}
                onChange={(event) => setImage(event.target.files[0])}
                />
              
              { showSpinner &&  
                (<Loader type="Puff"
                  color="#757575"
                  height={100}
                  width={100}
                  timeout={3000}
                  />)}
              <Button
                size="large" 
                style={{
                  fontSize: 14, 
                  marginBottom: "5vh",
                  marginTop: "5vh",
                  width: "15vw",
                  marginLeft: "5vw"
                  }}
                color="primary"
                variant="contained"
                onClick={(e) => uploadImage(e)}
              >Upload image</Button>
              <Button
                size="large" 
                endIcon={<DeleteIcon/>}
                style={{
                  fontSize: 14, 
                  marginBottom: "5vh",
                  marginTop: "2vh",
                  width: "15vw",
                  marginLeft: "5vw"
                  }}
                color="primary"
                variant="contained"
                onClick={(e) => deleteImage(e)}
              >Delete image</Button>
              <Button
                size="large" 
                endIcon={<SaveIcon/>}
                style={{
                  fontSize: 14, 
                  marginTop: "12vh",
                }}
                color="secondary"
                variant="contained"
                type="submit">Save changes</Button>
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
                      marginLeft: "1vw",
                      width: "15vw"
            }}
              color="primary"
              variant="contained"
              type="submit">Update Password</Button>
          </form>
        </div>
        <form>
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
          endIcon={<DeleteIcon/>}
              style={{
              fontSize: 14, 
              marginBottom: "5vh",
              marginTop: "2vh",
            }}
              color="primary"
              variant="contained"
              onClick={deleteUser}>Delete</Button>
        </form>
        </CardContent>
        </Card>
      </Grid>
      </div>
    );
}

export default SettingsView;

