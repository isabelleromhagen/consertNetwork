import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../../shared/global/provider/UserContext';
import UserService from '../../../shared/api/service/UserService';
import '../Profile.css'

const SettingsView = () => {
  const currentUser = useContext(UserContext);
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const [info, setInfo] = useState({username: currentUser.user.username, pictureUrl: "", bio: currentUser.user.bio, password: "", password2: "", want: want, seen: seen, token: "", _id: ""});
  const [passwordToDelete, setPasswordToDelete] = useState("");
    

   const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value});
  }

  const update = (e) => {
    e.preventDefault();
      UserService.updateCurrentUser(info).then(data => {
          currentUser.setUser(info);
      })
  }

  const deleteUser = (e) => {
    e.preventDefault();
    console.log('from delete password field: ', passwordToDelete);
    let data = ({_id:info._id, password: passwordToDelete})
    console.log("data: ", data);
    UserService.deleteUser(data)
  }

  useEffect(() => {
      console.log('current user: ', currentUser);
      if(currentUser.user.want) {
        let wantArr = Array.from(currentUser.user.want);
        let seenArr = Array.from(currentUser.user.seen);
        console.log('want array is arr: ', Array.isArray(wantArr), ' contains: ', wantArr);
        console.log('id: ', currentUser.user._id);
        // setWant(wantArr);
        // setSeen(seenArr);
        setInfo({username: currentUser.user.username, bio: currentUser.user.bio, want: wantArr, seen: seenArr, token: currentUser.token, _id: currentUser.user._id});
       
      }
     
  }, []);
    return (
      <div className="settingsWrapper">
        <h3>Settings</h3>
        <div className="updateWrapper">
          <form onSubmit={update}>
              <span>Username</span>
              <input name="username"
              type="textfield"
              onChange={onChange}
              value={info.username} />
              <br />
              <span>Profile picture URL</span>
              <input name="pictureUrl"
              type="textfield"
              onChange={onChange}
              value={info.pictureUrl} /> <br />
              <span>Biography</span>
              <input name="bio"
              type="textfield"
              onChange={onChange}
              value={info.bio} /> <br />
              <span>Password</span>
              <input name="password"
              type="password"
              onChange={onChange}
              value={info.password} /> <br />
              <span>Repeat password</span>
              <input name="password"
              type="password"
              onChange={onChange}
              value={info.password} /> <br />
              <button type="submit">Update</button>
          </form>
        </div>
        <div className="deleteWrapper">
          <h4>Delete account</h4>
          <span>Enter password</span> <br />
          <input type="password" onChange={e => setPasswordToDelete(e.target.value)} value={passwordToDelete} /> <br />
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    );
}

export default SettingsView;