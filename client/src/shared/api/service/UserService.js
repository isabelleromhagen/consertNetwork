export default {
    getUsers: () => {
        return fetch("/users").then((res) => {
            return res.json().then(data => data);
        })
    }
}