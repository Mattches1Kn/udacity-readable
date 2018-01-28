import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {categoryList} from './categoryList';
import {posts} from "./posts";
import {postDetail} from "./postDetail";
import {commentForm, postForm} from "./forms";

export default combineReducers({
    categoryList,
    posts,
    postDetail,
    postForm,
    commentForm,
    routing: routerReducer
});
