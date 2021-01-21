export default {
    getFeed: () => {
        return fetch("/feed").then((res) => {
            return res.json().then(data => data);
        })
    },
    addToFeed: (data) => {
        return fetch("/feed", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type":"application/json"},
        }).then((res) => {
            return res.json().then(data => data);
        })
    }

}