import React from 'react';
import './Comment.css';
import {Confirm} from "react-confirm-bootstrap";
import Vote from "./Vote";

function Comment(props)  {
    const {comment} = props;
    const date = new Date(comment.timestamp);
    return (
            <div className="Comment">
                <div className="Comment-content">
                    <div className="Comment-author"><b>{comment.author}</b></div>
                    <div className="Comment-body">{comment.body}</div>
                    <div className="Comment-date">{date.toLocaleString()}</div>
                    <div className="Comment-buttons">
                        <Vote voteUp={(id) => props.onVote(id, 'upVote')} voteDown={(id) => props.onVote(id, 'downVote')} voteScore={comment.voteScore} id={comment.id}/>
                        <button style={{'marginLeft':'30px'}} onClick={() => props.onEdit(comment.id)} type="button" className="btn btn-primary btn-sm glyphicon glyphicon-pencil"> </button>
                        <Confirm
                            confirmBSStyle="primary"
                            style={{'marginLeft':'5px'}}
                            onConfirm={() => props.onRemoveComment(comment)}
                            body="Are you sure you want to delete this comment?"
                            confirmText="Confirm Delete"
                            title="Deleting Comment">
                            <button  type="button" className="btn btn-primary btn-sm glyphicon glyphicon-trash"> </button>
                        </Confirm>
                    </div>
                    <div className="Comment-clear"> </div>
                </div>
            </div>
    );
}

export default Comment;
