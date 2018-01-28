import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NoRouteMatch from "../components/NoRouteMatch";
import { connect } from 'react-redux';
import {loadCategoryList} from "../actions/categoryList";
import Navigation from "../components/Navigation";
import { withRouter } from 'react-router-dom';
import Posts from "./Posts";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import PropTypes from 'prop-types';

class App extends Component {

    componentDidMount() {
        this.props.loadCategoryList();
    }

    render() {
        const {categoryList} = this.props;
        return (

                <div className="App">
                    <div className="App-header"><span className="App-title">Project Readable</span></div>
                    <div className="App-navigation"><Navigation availableCategories={categoryList}/></div>
                    <div className="App-content"><Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route exact path="/comment/:id/edit/:category" component={CommentForm}/>
                        <Route exact path="/create" component={PostForm}/>
                        <Route exact path="/create/:category" component={PostForm}/>
                        <Route exact path="/:category/:id/edit" component={PostForm}/>
                        <Route exact path="/:category/:id" component={PostDetail}/>
                        <Route exact path="/:category" component={Posts}/>
                        <Route component={NoRouteMatch}/>
                    </Switch></div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryList: state.categoryList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategoryList: (url) => dispatch(loadCategoryList())
    };
};

App.propTypes = {
    categoryList: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
