import React, {Component} from 'react';
import {getPost, votePost, VOTE_POST} from "../actions/posts";
import {connect} from 'react-redux';
import {Badge, Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel} from "react-bootstrap";
import Comment from "../components/Comment";
import './PostDetail.css';
import PostPreview from "./PostPreview";
import history from '../history';
import {addComment, deleteComment, getCommentsOfPost, voteComment} from "../actions/comments";
import PropTypes from 'prop-types';
import NoRouteMatch from "../components/NoRouteMatch";

class PostDetail extends Component {

    state = {
        commentAuthor: '',
        commentBody: ''
    };

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.commentAuthor.length < 5) {
            alert('Enter your name (min 5 characters)');
            return false;
        }
        if (this.state.commentBody.length < 10) {
            alert('Enter a message (min 10 characters)');
            return false;
        }
        this.props.addComment(this.props.match.params.id, this.state.commentAuthor, this.state.commentBody);
        this.setState({commentAuthor : '', commentBody : ''});
    };

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
        this.props.getCommentsOfPost(this.props.match.params.id);
    }

    removeComment = (comment) => {
        this.props.deleteComment(comment.id);
    };

    onVote = (voteType) => {
        this.props.votePost(this.props.post.id, voteType, VOTE_POST);
    };

    onVoteComment = (id, voteType) => {
        this.props.voteComment(id, voteType);
    };

    onEditComment = (id) => {
        history.push('/comment/' + id + '/edit/' + this.props.post.category);
    };

    getValidationStateAuthor() {
        const length = this.state.commentAuthor.length;
        if (length > 4) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStateBody() {
        const length = this.state.commentBody.length;
        if (length > 9) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        if (this.props.loadingError) {
            return (
                <div style={{'width' : '80%'}}><NoRouteMatch/></div>
            );
        }
        const commentCount = this.props.comments ? this.props.comments.length : 0;
        let {post, comments} = this.props;

        return (
            <div className="PostDetail">
                <PostPreview data={post} isDetailView={true} onVote={this.onVote}/>
                <div style={{'width' : '80%', 'marginTop' : '30px'}}>
                    <Panel header={(<span><Badge>{commentCount}</Badge> Comments</span>)}>
                        {comments && comments.sort(function(a, b){return a.timestamp < b.timestamp}).map( (comment,index) => (
                            <Comment
                                onEdit={this.onEditComment} onVote={this.onVoteComment} onRemoveComment={this.removeComment} key={comment.id} comment={comment}/>
                        ))}
                    </Panel>
                </div>
                <div style={{'width' : '80%'}}>
                    <Panel header={(<span>Add a Comment</span>)}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup bsSize="large" validationState={this.getValidationStateAuthor()}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Author
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    id="commentAuthor"
                                    name="commentAuthor"
                                    type="text"
                                    value={this.state.commentAuthor}
                                    placeholder="Enter your name"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup bsSize="large" validationState={this.getValidationStateBody()}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Message
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    id="commentBody"
                                    name="commentBody"
                                    type="text"
                                    componentClass="textarea"
                                    value={this.state.commentBody}
                                    placeholder="Enter your message"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup bsSize="large">
                            <Col smOffset={2} sm={10}>
                                <div style={{'textAlign' : 'right'}}><Button type="submit">Save</Button></div>
                            </Col>
                        </FormGroup>
                    </Form>
                    </Panel>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.postDetail.post,
        comments: state.postDetail.comments,
        isLoading: state.postDetail.isLoading,
        loadingError: state.postDetail.loadingError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (id) => dispatch(getPost(id)),
        getCommentsOfPost: (id) => dispatch(getCommentsOfPost(id)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        voteComment: (id, voteType) => dispatch(voteComment(id, voteType)),
        addComment: (postId, author, body) => dispatch(addComment(postId, author, body)),
        votePost: (id, voteType, actionType) => dispatch(votePost(id, voteType, actionType)),
    };
};

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

