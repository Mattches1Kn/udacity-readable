import {CATEGORY_LIST_LOADING_SUCCESS} from '../actions/categoryList';

export function categoryList(state = [], action) {
    switch (action.type) {
        case CATEGORY_LIST_LOADING_SUCCESS:
            return action.items;
        default:
            return state;
    }
}




