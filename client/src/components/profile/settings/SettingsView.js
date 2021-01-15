import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../../shared/global/provider/UserContext';
import UserService from '../../../shared/api/service/UserService';
import RoutingPath from "../../../routes/RoutingPath";
import '../Profile.css'

const SettingsView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [want, setWant] = useState([]);
  const [seen, setSeen] = useState([]);
  const [info, setInfo] = useState({username: currentUser.user.username, pictureUrl: "", bio: currentUser.user.bio, password: "", password2: "", want: want, seen: seen, token: "", _id: ""});
  const [passwordToDelete, setPasswordToDelete] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
    

   const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value});
  }

  const update = (e) => {
    e.preventDefault();
      UserService.updateCurrentUser(info).then(data => {
          currentUser.setUser(info);
      })
  }

  const updatePassword = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, currentPassword: currentPassword, newPassword1: newPassword1, newPassword2: newPassword2})
    UserService.updatePassword(data)
  }

  const deleteUser = (e) => {
    e.preventDefault();
    let data = ({_id:info._id, password: passwordToDelete})
    UserService.deleteUser(data)
        currentUser.setUser(null)
        currentUser.setIsAuthenticated(false)
        currentUser.setToken(null)
        history.push(RoutingPath.signInView)
  }

  useEffect(() => {
      console.log('current user: ', currentUser);
      if(currentUser.user.want) {
        let wantArr = Array.from(currentUser.user.want);
        let seenArr = Array.from(currentUser.user.seen);
        console.log('want array is arr: ', Array.isArray(wantArr), ' contains: ', wantArr);
        console.log('id: ', currentUser.user._id);
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
              <button type="submit">Update</button>
          </form>
        </div>
        <div className="updateWrapper">
          <form onSubmit={updatePassword}>
              <h4>Change password</h4>
              <span>Enter current password</span>
              <input name="currentPassword"
              type="password"
              onChange={e => setCurrentPassword(e.target.value)} value={currentPassword}  /> <br />
              <span>New password</span>
              <input name="newPassword1"
              type="password"
              onChange={e => setNewPassword1(e.target.value)} value={newPassword1}  /> <br />
              <span>Repeat new password</span>
              <input name="newPassword2"
              type="password"
              onChange={e => setNewPassword2(e.target.value)} value={newPassword2} /> <br />
              <button type="submit">Update Password</button>
          </form>
        </div>
        <div className="updateWrapper">
          <h4>Delete account</h4>
          <span>Enter password</span> <br />
          <input type="password" onChange={e => setPasswordToDelete(e.target.value)} value={passwordToDelete} /> <br />
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    );
}

export default SettingsView;