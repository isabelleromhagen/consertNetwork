export default {
    getFeed: () => {
        return fetch("/feed").then((res) => {
            return res.json().then(data => data);
        })
    },
    getPostById: (id) => {
        return fetch(`/feed/${id}`).then(res => {
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
    },
    addComment: (data) => {
        return fetch("/feed/comment", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"},
        }).then((res) => {
            return res.json().then(data => data)
        })
    },
    toggleLike: (data) => {
        return fetch("feed/like", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
        })
        .then((res) => {
            return res.json()
            .then(data => data)
        })
    }
}