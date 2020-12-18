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
    updateCurrentUser: (token, data) => {
        return fetch("http://localhost:8080/users/me", {
          method: "post",
          body: JSON.stringify(data),
          headers: { "x-auth-token": token, "Content-Type":"x-auth-token"},
        });
    }
}
//TODO: lägg till band i lista genom att trycka på knapp! 

