import * as Api from "../util/Api";

export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING';
export const COMMENTS_LOADING_SUCCESS = 'COMMENTS_LOADING_SUCCESS';
export const COMMENTS_LOADING_ERROR = 'COMMENTS_LOADING_ERROR';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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

export function voteComment(id, voteType) {
    return (dispatch) => {
        Api.voteComment(id, voteType)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((comment) => dispatch(voteCommentResult(true, comment)))
            .catch(() => dispatch(voteCommentResult(false, null)));
    };
}

export function addComment(postId, author, body) {
    return (dispatch) => {
        Api.createComment(postId, author, body)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((comment) => dispatch(addCommentResult(true, comment)))
            .catch(() => dispatch(addCommentResult(false, null)));
    };
}

export function updateComment(id, body) {
    return (dispatch) => {
        Api.updateComment(id, body)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((comment) => dispatch(updateCommentResult(true, comment)))
            .catch(() => dispatch(updateCommentResult(false, null)));
    };
}

export function deleteComment(id) {
    return (dispatch) => {
        Api.deleteComment(id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then((comment) => dispatch(deleteCommentResult(true, comment)))
            .catch(() => dispatch(deleteCommentResult(false)));
    };
}

export function getCommentsOfPost(id) {
    return (dispatch) => {
        dispatch(isLoading(COMMENTS_IS_LOADING, true));

        Api.getCommentsOfPost(id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isLoading(COMMENTS_IS_LOADING, false));

                return response;
            })
            .then(res => res.json())
            .then((items) => dispatch(loadingSuccessComments(items)))
            .catch(() => dispatch(loadingError(COMMENTS_LOADING_ERROR, true)));
    };
}

export function loadingSuccessComments(comments) {
    return {
        type: COMMENTS_LOADING_SUCCESS,
        comments: comments,
        isLoading: false
    };
}

export function voteCommentResult(success, comment) {
    return {
        type: VOTE_COMMENT,
        success: success,
        comment: comment
    };
}

export function addCommentResult(success, comment) {
    return {
        type: ADD_COMMENT,
        success: success,
        comment: comment
    };
}

export function updateCommentResult(success, comment) {
    return {
        type: UPDATE_COMMENT,
        success: success,
        comment: comment
    };
}

export function deleteCommentResult(success, comment) {
    return {
        type: DELETE_COMMENT,
        success: success,
        comment: comment
    };
}
