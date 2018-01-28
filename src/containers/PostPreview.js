import React, {Component} from 'react';
import './PostPreview.css';
import {Badge, Panel} from "react-bootstrap";
import {connect} from "react-redux";
import {deletePost, VOTE_POST_IN_LIST, votePost} from "../actions/posts";
import history from '../history';
import {Confirm} from "react-confirm-bootstrap";
import Vote from "../components/Vote";
import PropTypes from 'prop-types';

class PostPreview extends Component {

    onVote = (id, voteType) => {
        if (this.props.onVote !== undefined) {
            this.props.onVote(voteType);
        } else {
            this.props.votePost(id, voteType, VOTE_POST_IN_LIST);
        }
    };

    onDelete = () => {
        this.props.deletePost(this.props.data.id);
    };

    onEdit = () => {
        history.push('/' + this.props.data.category + '/' + this.props.data.id + '/edit/');
    };

    onDetail = () => {
        history.push('/' + this.props.data.category + '/' + this.props.data.id);
    };

    render() {
        const {title, body, commentCount, voteScore, timestamp, author, category, id} = this.props.data;
        const date = new Date(timestamp);
        return (
            <div className="PostPreview">
                <Panel header={(<h2>{title}<span>{category}</span></h2> )}>
                <p className="PostPreview-body">{body}</p>
                <div>
                    <div className="PostPreview-info">
                        <span style={{'marginRight':'30px'}}><i><b>{author}</b></i> wrote on {date.toLocaleString()}</span>
                        {this.props.isDetailView === false && <Badge>{commentCount} Comments</Badge>}
                    </div>
                    <div className="PostPreview-buttons">
                        <Vote voteUp={(id) => this.onVote(id, 'upVote')} voteDown={(id) => this.onVote(id, 'downVote')} voteScore={voteScore} id={id}/>
                        <button
                                style={{'marginLeft':'30px'}}
                                onClick={this.onDetail}
                                type="button"
                                className="btn btn-primary btn-sm glyphicon glyphicon-eye-open">
                        </button>
                        <button
                            style={{'marginLeft':'5px'}}
                            onClick={this.onEdit}
                            type="button"
                            className="btn btn-primary btn-sm glyphicon glyphicon-pencil">
                        </button>
                        {this.props.isDetailView === false  && (<Confirm
                            confirmBSStyle="primary"
                            style={{'marginLeft':'5px'}}
                            onConfirm={this.onDelete}
                            body="Are you sure you want to delete this post?"
                            confirmText="Confirm Delete"
                            title="Deleting Post">
                            <button  type="button" className="btn btn-primary btn-sm glyphicon glyphicon-trash"> </button>
                        </Confirm>)}


                    </div>
                    <div style={{'clear' : 'both'}}/>
                </div>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        votePost: (id, voteType, actionType) => dispatch(votePost(id, voteType, actionType)),
        deletePost: (id) => dispatch(deletePost(id))
    };
};

PostPreview.propTypes = {
    isDetailView: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onVote: PropTypes.func,
    onEdit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);
