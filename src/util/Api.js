const uuidv1 = require('uuid/v1');

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

const postHeaders = {
    ...headers,
    'Content-Type': "application/json"
};

export function getCategoryList ()  {
    return fetch(`${api}/categories`, { headers, method:'GET' })
}

export function getPosts (category)  {
    if (category) {
        return fetch(`${api}/${category}/posts`, { headers, method:'GET' })
    }
    return fetch(`${api}/posts`, { headers, method:'GET' })
}

export function getPost (id)  {
    return fetch(`${api}/posts/${id}`, { headers, method:'GET' })
}

export function getCommentsOfPost (postId)  {
    return fetch(`${api}/posts/${postId}/comments`, { headers, method:'GET' })
}

export function votePost (postId, voteType)  {
    const data =  JSON.stringify({
        option: voteType
    });
    return fetch(`${api}/posts/${postId}`, {headers: postHeaders, method:'POST', body: data })
}

export function getComment (id)  {
    return fetch(`${api}/comments/${id}`, { headers, method:'GET' })
}

export function voteComment (commentId, voteType)  {
    const data =  JSON.stringify({
        option: voteType
    });
    return fetch(`${api}/comments/${commentId}`, {headers: postHeaders, method:'POST', body: data })
}

export function deletePost(id) {
    return fetch(`${api}/posts/${id}`, { headers, method:'DELETE' })
}

export function deleteComment(id) {
    return fetch(`${api}/comments/${id}`, { headers, method:'DELETE' })
}

export function updatePost(id, title, body) {
    const data =  JSON.stringify({
        title: title,
        body: body,
    });
    return fetch(`${api}/posts/${id}`, {headers: postHeaders, method:'PUT', body: data })
}

export function createPost(author, title, body, category) {
    const data =  JSON.stringify({
        title: title,
        body: body,
        author: author,
        category : category,
        timestamp : Date.now(),
        id : uuidv1()
    });
    return fetch(`${api}/posts`, {headers: postHeaders, method:'POST', body: data })
}

export function createComment(parentId, author, body) {
    const data =  JSON.stringify({
        parentId: parentId,
        body: body,
        author: author,
        timestamp : Date.now(),
        id : uuidv1()
    });
    return fetch(`${api}/comments`, {headers: postHeaders, method:'POST', body: data })
}

export function updateComment(id, body) {
    const data =  JSON.stringify({
        body: body,
    });
    return fetch(`${api}/comments/${id}`, {headers: postHeaders, method:'PUT', body: data })
}
