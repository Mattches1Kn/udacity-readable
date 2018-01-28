import {UPDATE_COMMENT} from "../actions/comments";
import {UPDATE_POST} from "../actions/posts";

initialState = {
    success: false,
}
export function commentForm (state = initialState, action) {
    switch (action.type) {
        case UPDATE_COMMENT:
            return {
                success: action.success
            };
        default:
            return state;
    }
}

export function postForm (state = initialState, action) {
    switch (action.type) {
        case UPDATE_POST:
            return {
                success: action.success
            };
        default:
            return state;
    }
}
