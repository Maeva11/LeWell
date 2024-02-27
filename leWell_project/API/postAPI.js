import axios from 'axios';

export function getPosts() {
    const url = 'https://lynx.jamy-app.fr/api/api/posts'
    return new Promise((resolve, reject) => {
        return axios.get(url).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    });
}

export function createPost(data) {
    return new Promise((resolve, reject) => {
    const token = '50|fb9uP080BSEVyiWqEmtqWj7rWPQNj5VJyik95KJ5'
    const url = 'https://lynx.jamy-app.fr/api/api/posts'
    const params = {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data;',
    'Authorization': 'Bearer ' + token
    },
    }
    return axios.post(url, data, params).then(response => {
    resolve(response)
    }).catch(error => {
    console.log(error)
    reject(error)
    });
});
} 
