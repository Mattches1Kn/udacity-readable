import React, {Component} from 'react';
import {connect} from "react-redux";
import {getComment} from "../util/Api";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import history from '../history';
import {updateComment} from "../actions/comments";
import PropTypes from 'prop-types';

class CommentForm extends Component {

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            getComment(this.props.match.params.id)//TODO refactor
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(res => res.json())
                .then((comment) => {
                    this.setState({
                        ...comment
                    })
                });
        } else {
            this.setState({author : '', body : ''});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.id) {
            if (this.state.author.length < 5) {
                alert('Enter your name (min 5 characters)');
                return false;
            }
            if (this.state.body.length < 10) {
                alert('Enter a message (min 10 characters)');
                return false;
            }
            this.props.updateComment(this.state.id, this.state.body);
            history.push('/' + this.props.match.params.category + '/' + this.state.parentId);
        }
    };

    handleCancel = () => {
        history.goBack();
    };

    getValidationStateBody() {
        const length = this.state.body.length;
        if (length > 9) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        const heading = 'Edit Comment';
        if (this.state === null) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        return (
            <div style={{'width' : '80%'}}>
                <h2>{heading}</h2>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large" >
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                disabled={true}
                                id="commentAuthor"
                                name="author"
                                type="text"
                                value={this.state.author}
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
                                name="body"
                                type="text"
                                componentClass="textarea"
                                value={this.state.body}
                                placeholder="Enter your message"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <Col smOffset={2} sm={10}>
                            <div style={{'textAlign' : 'right'}}>
                                <Button style={{'marginRight' : '10px'}} onClick={this.handleCancel} type="button">Cancel</Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.commentForm.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateComment: (id, body) => dispatch(updateComment(id, body)),
    };
};

CommentForm.propTypes = {
    match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
