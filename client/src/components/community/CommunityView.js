import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserService from '../../shared/api/service/UserService';
import RoutingPath from "../../routes/RoutingPath";
// import "../browse/BrowseView.css";
import { ProfilePreview } from "../profile/ProfilePreview";
import {
  Card,
  CardContent,
  Container, 
} from "@material-ui/core";

const CommunityView = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers().then(data => {
      setUsers(data);
    })
  }, []);

  const fetchData = () => {
    //search database for users

    //TODO: get all users from database. enable get user by id when clicking on specific user to visit their profile
  };
  const displayData = () => {
    if (data) {
      return (
        <Card>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Following</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={data.artist}
              onClick={() => history.push(RoutingPath.profileView)}
            >
              <td>
                <span>{data.artist.name}</span>
              </td>
              <td>
                <img
                  src={data.artist.image}
                  alt={data.artist.name}
                  key={data.artist}
                />
              </td>
              <td>
                <span>{data.artist.summary}</span>
              </td>
              <td>
                <button>Seen</button>
              </td>
            </tr>
          </tbody>
        </table>
        </Card>
      );
    }
  };

  return (
    <div className="wrapper">
      <Container>
      <Card>
          <div className="searchDiv">
            <span>Search: </span>
            <input onChange={(event) => setSearch(event.target.value)} />
              <button onClick={() => fetchData()}>Find user</button>
            <div className="contentDiv">{displayData()}</div>
          </div>
          <div className="contentDiv">
            <h1>Current users</h1>
            <div className="itemsContainer">
              {users.map((user) => (
                <ProfilePreview
                  key={user._id}
                  name={user.username}
                  id={user._id}
                  user={user}
                />
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default CommunityView;
