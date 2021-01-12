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
    updateCurrentUser: (data) => {
        console.log('in service, data: ', data, 'want is array: ', Array.isArray(data.want));
        return fetch("http://localhost:8080/users/update", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type":"application/json"},
        });
    }
    // updateCurrentUser: (token, data) => {
    //     console.log('in service, data: ', data, 'want is array: ', Array.isArray(data.want));
    //     return fetch("http://localhost:8080/users/update", {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: { "x-auth-token": token, "Content-Type":"x-auth-token"},
    //     });
    // }
}