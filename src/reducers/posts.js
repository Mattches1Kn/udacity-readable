import {
    DELETE_POST_IN_LIST,
    POSTS_LIST_IS_LOADING, POSTS_LIST_LOADING_ERROR, POSTS_LIST_LOADING_SUCCESS, UPDATE_POST,
    VOTE_POST_IN_LIST
} from "../actions/posts";

const initialState = {
    loadingError : false,
    isLoading: false,
    items: []
};

export function posts(state = initialState, action) {
    let {items} = state;
    let index;
    switch (action.type) {
        case POSTS_LIST_LOADING_SUCCESS:
            return {
                ...state,
                items: action.items,
                isLoading: action.isLoading
            };
        case POSTS_LIST_IS_LOADING:
            return {
                ...state,
                items: [],
                isLoading: action.isLoading
            };
        case POSTS_LIST_LOADING_ERROR:
            return {
                ...state,
                items: [],
                isLoading: action.isLoading
            };
        case VOTE_POST_IN_LIST:
        case UPDATE_POST:
            index = items.findIndex( (item) => (item.id === action.post.id));
            if (index !== -1) {
                items[index] = action.post;
            }
            return {
                items: items
            };
        case DELETE_POST_IN_LIST:
            index = items.findIndex( (item) => (item.id === action.post.id));
            items.splice(index,1);
            return {
                items: items.slice(0)//clone of items
            };
        default:
            return state;
    }
}
