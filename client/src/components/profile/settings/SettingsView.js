import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../../shared/global/provider/UserContext';
import UserService from '../../../shared/api/service/UserService';
import '../Profile.css'

const SettingsView = () => {
  const currentUser = useContext(UserContext);
  const [want, setWant] = useState([]);
    const [seen, setSeen] = useState([]);
  const [info, setInfo] = useState({username: currentUser.username, pictureUrl: "", bio: "", password: "", password2: "", want: want, seen: seen, token: "", _id: ""});
  // const [info, setInfo] = useState({username: currentUser ? currentUser.user.username : "dummy", pictureUrl: "", bio: currentUser ? currentUser.user.bio : "dummy", password: "", password2: ""});
    // const [info, setInfo] = useState({username: "Kannan", email: "karin@test.com", password: "123456", date: Date.now, bio: "blablabla", want: ["Behemoth"], seen: ["Lamb of God"] })
    

   const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value});
  }

  const update = (e) => {
    e.preventDefault();
      console.log('want in update: ', want, ' info want: ', info.want);
      console.log('currentUser token in update : ', currentUser.token, ' info token: ', info.token);
      UserService.updateCurrentUser(info).then(data => {
          //submit added info, if empty: submit old info to prevent losing data.
        console.log('info updated! data: ', data);
      })
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
        setInfo({username: currentUser.username, bio: currentUser.bio, want: wantArr, seen: seenArr, token: currentUser.token, _id: currentUser.user._id});
       
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
          <input type="password" /> <br />
          <button>Delete</button>
        </div>
      </div>
    );
}

export default SettingsView;