import React from 'react';
import PostPreview from "../containers/PostPreview";
import PostSortBar from "./PostSortBar";


function PostList(props)  {
    if (props.items) {
        if (props.sortBy && props.sortBy === 'voteScore') {
            props.items.sort(function (a, b) {
                return a.voteScore <= b.voteScore;
            })
        } else {
            props.items.sort(function (a, b) {
                return a.timestamp <= b.timestamp;
            })
        }
    }

    if (props.items && props.items.length > 0) {
        return (
            <div>
                <PostSortBar onSortBy={props.onSortBy}/>
                <div>
                        {props.items && props.items.map( (post,index) => (
                            <div key={index}><PostPreview isDetailView={false} data={post}/></div>
                        ))}

                </div>
            </div>
        );
    }

    return (
        <div>
            No Posts in this category
        </div>
    );

}

export default PostList;
