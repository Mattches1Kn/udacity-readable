
import {POST_IS_LOADING, POST_LOADING_ERROR, POST_LOADING_SUCCESS, VOTE_POST} from "../actions/posts";
import {ADD_COMMENT, COMMENTS_LOADING_SUCCESS, DELETE_COMMENT, VOTE_COMMENT} from "../actions/comments";

export function postDetail(state = {post : {'author':'', 'title' : '', 'body' : ''}, isLoading:false, loadingError : false}, action) {
    let index = -1;
    let {comments} = state;

    switch (action.type) {
        case POST_LOADING_SUCCESS:
            return {
                ...state,
                post: action.post,
                isLoading: action.isLoading,
                loadingError: action.loadingError
            };
        case COMMENTS_LOADING_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                isLoading: action.isLoading
            };
        case POST_IS_LOADING:
            return {
                ...state,
                post: {},
                isLoading: action.isLoading
            };
        case POST_LOADING_ERROR:
            return {
                ...state,
                post: {},
                isLoading: false,
                loadingError: true
            };
        case DELETE_COMMENT:
            index = comments.findIndex( (item) => (item.id === action.comment.id));
            comments.splice(index, 1);
            return {
                ...state,
                comments: comments.slice(0)//clone of comments
            };
        case ADD_COMMENT:
            comments.push(action.comment);
            return {
                ...state,
                comments: comments.slice(0)//clone of comments
            };
        case VOTE_COMMENT:
            index = comments.findIndex( (item) => (item.id === action.comment.id));
            if (index !== -1) {
                comments[index] = action.comment;
            }
            return {
                ...state,
                comments: comments.slice(0)//clone of comments
            };
        case VOTE_POST:
            return {
                ...state,
                post: action.post,
            };

        default:
            return state;
    }
}
