import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPost} from "../util/Api";
import {updatePost, newPost} from "../actions/posts";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel} from "react-bootstrap";
import history from '../history';
import PropTypes from 'prop-types';

class PostForm extends Component {

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            history.push('/' + this.state.category);//form success -> redirect to category page
        }
    }

    componentDidMount() {
        let selectedCategory = '';
        if (this.props.match && this.props.match.params.category) {
            selectedCategory = this.props.match.params.category;
        }
        if (!selectedCategory) {
            selectedCategory = 'react';
        }
        if (this.props.match && this.props.match.params.id) {
            getPost(this.props.match.params.id)//TODO refactor
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(res => res.json())
                .then((post) => {
                    this.setState({
                        selectedCategory,
                        ...post
                    })
                });
        } else {
            this.setState(
                {
                    selectedCategory: selectedCategory,
                    category: selectedCategory,
                    author : '',
                    title : '',
                    body : ''
                }
            )
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.author.length < 5) {
            alert('Enter author (min 5 characters)');
            return false;
        }
        if (this.state.title.length < 5) {
            alert('Enter title (min 5 characters)');
            return false;
        }
        if (this.state.body.length < 10) {
            alert('Enter body (min 10 characters)');
            return false;
        }
        if (this.state.id) {
            this.props.updatePost(this.state.id, this.state.title, this.state.body);
        } else {
            this.props.createPost(this.state.author, this.state.title, this.state.body, this.state.category);
        }
    };

    handleCancel = () => {
        history.goBack();
    };

    getValidationStateAuthor() {
        const length = this.state.author.length;
        if (length > 4) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStateTitle() {
        const length = this.state.title.length;
        if (length > 4) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStateBody() {
        const length = this.state.body.length;
        if (length > 9) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        let heading = 'Create Post';
        if (this.props.match && this.props.match.params.id) {
            heading = 'Edit Post';
        }

        const {categoryList} = this.props;
        if (this.state === null) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        return (
            <div style={{'width' : '80%', 'marginTop' : '30px'}}>
                <Panel header={(<h2>{heading}</h2>)}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup bsSize="large">
                            <Col componentClass={ControlLabel} sm={2}>
                                Category
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    disabled={this.state.id !== undefined}
                                    defaultValue={this.state.selectedCategory}
                                    name="category"
                                    onChange={this.handleChange}
                                    componentClass="select"
                                >
                                    {categoryList && categoryList.map((category, index) => (
                                        <option key={index} value={category.name}> {category.name} </option>
                                    ))}
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup bsSize="large" validationState={this.getValidationStateAuthor()}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Author
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    disabled={this.state.id !== undefined}
                                    id="postAuthor"
                                    name="author"
                                    type="text"
                                    value={this.state.author}
                                    placeholder="Enter your name"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup bsSize="large" validationState={this.getValidationStateTitle()}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Title
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    id="postTitle"
                                    name="title"
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Enter the title"
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
                                    id="postBody"
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
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.categoryList,
        success: state.postForm.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePost: (id, title, body) => dispatch(updatePost(id, title, body)),
        createPost: (author, title, body, category) => dispatch(newPost(author, title, body, category)),
    };
};

PostForm.propTypes = {
    match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
