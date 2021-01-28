import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/UserContext';
import UserService from '../../shared/services/UserService';
import "./Profile.css";
// import ProfilePic from "../../shared/images/profilePic.jpg";
import RoutingPath from "../../routes/RoutingPath";
import { Card, Typography, Grid, CardContent, CardHeader } from "@material-ui/core";

const ProfileView = (props) => {
  const currentUser = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState({});
  const [images, setImages] = useState([]);
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const history = useHistory();

  const goToArtist = (artist) => {
      history.push(`/band/${artist}`);
  }

  const loadProfilePicture = () => {
    
    const filename = "619182b49c92a971dff91eb9a60954b8.jpg";
    //  UserService.getImageByFilename(filename).then((data) => {
    //     console.log('got back from db: ', data);
    //     setProfilePicture(data);
    // })

//TODO_:::::::::: fizxxxxxxxxxxxxxx

    fetch('http://localhost:8080/files')
      .then(res => res.json())
      .then(files => {
        if (files.message) {
          console.log('no files.......');
        } else {
          console.log('setting files: ', files.files[0]);
          // setImages(files);

          setProfilePicture(files.files[0])
        }

      })
    // await fetch('http://localhost:8080/files')
    //       .then(res => {
    //           console.log(res);
    //           console.log(res....);
    //         if(res.data) {
    //            console.log(res.data);
    //            console.log('res.data.images: ', res.data.files);
    //         setFiles(res.data.files);
            
    //         }
            
    //       }).catch(err => console.log(err));


      //  fetch(`http://localhost:8080/${filename}`)
      //   .then(res => res.json())
      //   .then(files => {
      //     if(files.message) {
      //       console.log('no files...');
            
      //     } else {
      //       setFiles(files)
      //     }
      // }); 
      console.log(images);
  }

   useEffect(() => {
    //if an id has been given, fetch that user from db. else show current user. if there's none, go to login.
    if(props.match.params.userid !== "" && props.match.params.userid !== ":userid") {
      const userid = props.match.params.userid;
      UserService.getUser(userid).then(data => {
        if(data) {
          setProfile(data);
          setWant(data.want);
          setSeen(data.seen);
        }        
      })
    } else if (currentUser.isAuthenticated) {
          setProfile(currentUser.user);
          setWant(Array.from(currentUser.user.want));
          setSeen(Array.from(currentUser.user.seen));
          loadProfilePicture();
    } else {
      history.push(RoutingPath.signInView);
    }
   }, []);

  return (
    <div className="profileViewWrapper">
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
   
   
      {profile && (
     
        <CardHeader title={profile.username} style={{ marginLeft: "4vw"}}/>
      )}
      {profile && (
        <Typography style={{ marginLeft: "1vw"}}>{profile.bio}</Typography>
      )}
  
      {images && <img
        // src={ProfilePic}
        src={profilePicture}
        // src={`http://localhost:8080/image/'${images[0].filename}`}
        alt="profile pic"
        className="profilePic"
        width="200px"
        style={{
                display:"block",
                fontSize: 14, 
                marginBottom: "5vh",
                marginTop: "5vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5px"
          }}
      />}
    
      <div className="listWrapper" id="wantWrapper">
        <Typography className="subHeading" variant="h6">Want to see</Typography>
        {want && (
          <div>
            {want.map((band) => (
              <Typography key={band} onClick={() => goToArtist(band.trim())}>
                {band}
              </Typography>
            ))}
          </div>
        )}
      </div>      
      <div className="listWrapper" id="seenWrapper">
        <Typography className="subHeading" variant="h6">Seen</Typography>
        {seen && (
          <div>
              {seen.map((band) => (
                <Typography key={band} onClick={() => goToArtist(band.trim())}>
              {band}
              </Typography>
            ))}
          </div>
        )}
      </div>
      </CardContent>
    </Card>
    </Grid>
    </div>
  );
};

export default ProfileView;