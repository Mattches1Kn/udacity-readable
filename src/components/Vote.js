import React from 'react';
import './Vote.css';

function Vote(props)  {
    return (
        <div className="Vote">
            <button style={{'marginRight':'5px'}} type="button" className="btn btn-primary btn-sm glyphicon glyphicon-signal"> {props.voteScore} </button>
            <button onClick={() => props.voteUp(props.id)} type="button" className="btn btn-primary btn-sm glyphicon glyphicon-thumbs-up"> </button>
            <button onClick={() => props.voteDown(props.id)} type="button" className="btn btn-success btn-sm glyphicon glyphicon-thumbs-down"> </button>
        </div>
    );
}

export default Vote;
