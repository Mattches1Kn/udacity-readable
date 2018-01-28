import * as Api from "../util/Api";
import history from '../history';

export const POSTS_LIST_IS_LOADING = 'POSTS_LIST_IS_LOADING';
export const POSTS_LIST_LOADING_SUCCESS = 'POSTS_LIST_LOADING_SUCCESS';
export const POSTS_LIST_LOADING_ERROR = 'POSTS_LIST_LOADING_ERROR';
export const POST_IS_LOADING = 'POST_IS_LOADING';
export const POST_LOADING_SUCCESS = 'POST_LOADING_SUCCESS';
export const POST_LOADING_ERROR = 'POST_LOADING_ERROR';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_IN_LIST = 'VOTE_POST_IN_LIST';
export const DELETE_POST_IN_LIST = 'DELETE_POST_IN_LIST';
export const UPDATE_POST = 'UPDATE_POST';

export function loadingError(type, bool) {
    return {
        type: type,
        loadingError: bool
    };
}

export function isLoading(type, bool) {
    return {
        type: type,
        isLoading: bool
    };
}

export function loadingSuccess(items) {
    return {
        type: POSTS_LIST_LOADING_SUCCESS,
        items: items,
        isLoading: false
    };
}

export function loadingSuccessPost(post) {
    return {
        type: POST_LOADING_SUCCESS,
        post: post,
        isLoading: false
    };
}

export function votePostResult(success, post, actionType) {
    return {
        type: actionType,
        success: success,
        post: post
    };
}

export function updatePostResult(success, post) {
    return {
        type: UPDATE_POST,
        success: success,
        post: post
    };
}

export function deletePostResult(success, post, category) {
    if (success && category) {//delete from postDetail => go back to category page
        history.push('/' + category);
    }
    return {
        type: DELETE_POST_IN_LIST,
        success: success,
        post: post
    };
}

export function loadPostsList(category) {
    return (dispatch) => {
        dispatch(isLoading(POSTS_LIST_IS_LOADING, true));

        Api.getPosts(category)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isLoading(POSTS_LIST_IS_LOADING, false));

                return response;
            })
            .then(res => res.json())
            .then((items) => dispatch(loadingSuccess(items)))
            .catch(() => dispatch(loadingError(POSTS_LIST_LOADING_ERROR, true)));
    };
}

export function getPost(id) {
    return (dispatch) => {
        dispatch(isLoading(POST_IS_LOADING, true));

        Api.getPost(id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isLoading(POST_IS_LOADING, false));
                return response;
            })
            .then(res => res.json())
            .then((post) => dispatch(loadingSuccessPost(post)))
            .catch(() => dispatch(loadingError(POST_LOADING_ERROR, true)));
    };
}

export function votePost(id, voteType, type) {
    return (dispatch) => {
        Api.votePost(id, voteType)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((post) => dispatch(votePostResult(true, post, type)))
            .catch(() => dispatch(votePostResult(false, null, type)));
    };
}

export function deletePost(id, category) {
    return (dispatch) => {
        Api.deletePost(id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((post) => dispatch(deletePostResult(true, post, category)))
            .catch(() => dispatch(deletePostResult(false, null, category)));
    };
}

export function updatePost(id, title, body) {
    return (dispatch) => {
        Api.updatePost(id, title, body)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((post) => dispatch(updatePostResult(true, post)))
            .catch(() => dispatch(updatePostResult(false, null)));
    };
}

export function newPost(author, title, body, category) {
    return (dispatch) => {
        Api.createPost(author, title, body, category)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((post) => dispatch(updatePostResult(true, post)))
            .catch(() => dispatch(updatePostResult(false, null)));
    };
}
