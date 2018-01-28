import React from 'react';
import {FormGroup, Radio} from "react-bootstrap";

function PostSortBar(props)  {
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
    return (
        <div>
            <FormGroup>
                <span>Sort by : </span>
                <Radio name="sortBy" onChange={() => props.onSortBy('date')} defaultChecked inline>
                    Date
                </Radio>
                {' '}
                <Radio name="sortBy" onChange={() => props.onSortBy('voteScore')}  inline>
                    Vote Score
                </Radio>
                {' '}
            </FormGroup>
        </div>
    );
}

export default PostSortBar;
