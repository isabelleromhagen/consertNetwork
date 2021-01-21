export default {
    getUsers: () => {
        return fetch("/users").then((res) => {
            return res.json().then(data => data);
        })
    },
    getUser: (userid) => {
        return fetch(`http://localhost:8080/users/${userid}`).then((res) => {
          return res.json().then((data) => data);
        });
    },
    getUserByUsername: (username) => {
        return fetch(`http://localhost:8080/users/user/${username}`).then((res) => {
            return res.json().then((data) => data);
        })
    },
    updateCurrentUser: (data) => {
        return fetch("http://localhost:8080/users/update", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type":"application/json"},
        });
    },
    updatePassword: (data) => {
        return fetch("http://localhost:8080/users/updatePassword", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type":"application/json"}, 
        })
    },
    deleteUser: (data) => {
        return fetch(`http://localhost:8080/users/${data._id}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"},
        });
    }
}