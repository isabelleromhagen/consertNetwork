export default {
    getUsers: () => {
        return fetch("/users").then((res) => {
            return res.json().then(data => data);
        })
    },
    getUser: (userid) => {
        return fetch(`/users/${userid}`).then((res) => {
          return res.json().then((data) => data);
        });
    },
    getUserByUsername: (username) => {
        return fetch(`/users/user/${username}`).then((res) => {
            return res.json().then((data) => data);
        })
    },
    getImageByFilename: (filename) => {
        return fetch(`/${filename}`).then((res) => {
            return res.json().then((data) => data) 
            })  
    },
    getImageByFileId: (fileId) => {
        return fetch(`/image/${fileId}`).then((res) => {
            return res.json().then((data) => data)
        })
    },
    updateCurrentUser: (data) => {
        return fetch("/users/update", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type":"application/json"},
        })
    },
    uploadImage: (imageData) => {
        return fetch("/", {
            method: "POST",
            body: imageData,
        })
        .then((res) => {
            return res.json().then((data) => data) 
            }) 
    },
    deleteImage: (id) => {
        return fetch(`http://localhost:8080/files/${id}`, {
        method: "DELETE",
        body: id,
        });
    },
    updatePassword: (data) => {
        return fetch("/users/updatePassword", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type":"application/json"}, 
        })
    },
    deleteUser: (data) => {
        return fetch(`/users/${data._id}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"},
        });
    }
}