import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loadPostsList} from "../actions/posts";
import PostList from "../components/PostList";
import {LinkContainer} from "react-router-bootstrap";
import PropTypes from 'prop-types';

class Posts extends Component {

    state = {
        sortBy : 'date'
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.category !== this.props.match.params.category) {
            this.props.loadPostsList(nextProps.match.params.category);
            this.setState({
                ...this.state,
                sortBy : 'date',
                selectedCategory : nextProps.match.params.category
            })
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.category) {
            this.props.loadPostsList(this.props.match.params.category);
            this.setState({
                ...this.state,
                selectedCategory : this.props.match.params.category
            })
        } else {
            this.props.loadPostsList(null);
        }
    }

    sortBy = (sort) => {
        this.setState({
            ...this.state,
            sortBy : sort
        })
    };

    render() {
        if (this.props.posts.isLoading) {
            return <p>Loading ...</p>;
        }
        let heading = '';
        let createLink = '';
        if (this.props.match && this.props.match.params.category) {
            heading = 'Posts by "' + this.props.match.params.category + '"';
            createLink = '/create/' + this.props.match.params.category;
        } else {
            heading = 'All Posts';
            createLink = '/create'
        }
        return (
            <div style={{'width' : '80%'}}>
                <h2>{heading}</h2>
                <PostList onSortBy={this.sortBy} sortBy={this.state.sortBy} items={this.props.posts}/>
                <div style={{
                    'position' : 'fixed',
                    'right' : '25px',
                    'bottom' : '50px'
                }}>
                    <LinkContainer to={createLink}>
                        <button style={{'marginLeft':'5px'}} type="button" className="btn btn-primary btn-lg"> Add your Post </button>

                    </LinkContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPostsList: (category) => dispatch(loadPostsList(category))
    };
};

Posts.propTypes = {
    match: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
