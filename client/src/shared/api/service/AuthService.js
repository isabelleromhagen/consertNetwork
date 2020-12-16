  import axios from 'axios';

    const apiInstance = axios.create({
        baseURL: 'http://localhost:8080/',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const setAuthToken = token => {
        console.log('in set auth');
        if(token) {
            apiInstance.defaults.headers.common['x-auth-token'] = token
            localStorage.setItem('token', token);
            return true;
        } else {
            delete apiInstance.defaults.headers.common['x-auth-token'];
            localStorage.removeItem('token');
            return false;
        }
    }

export default {
    register: (user) => {
        return fetch("http://localhost:8080/users", {
          method: "post",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => data);
    },
    login: (user) => {
        return fetch("http://localhost:8080/auth", {
          method: "post",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.status !== 401) {
            return res.json().then((data) => data);
          } else {
            return {
              isAuthenticated: false,
              user: { id: null, username: "" },
              message: { msgBody: "Unauthorized", msgError: true },
            };
          }
        });
    },
    //return current user if authenticated
    isAuthenticated: (token) => {
          return fetch("http://localhost:8080/users/me", {
            method: "post",
            body: JSON.stringify(token),
            headers: {"Content-Type": "x-auth-token"},
          })
          .then((res) => {
            if(res.status !== 401) {
              console.log("got to is auth, token not valid");
              return res.json().then((data) => data);
            } else {
              return {
                isAuthenticated: false,
                user: {_id: null, username: ""},
                message: {msgBody: "Unauthorized", msgError: true}
              }
            }
          })
        }
    }