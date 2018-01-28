import React from 'react';
import {Nav, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import history from '../history';

function Navigation(props) {

    return (
            <div>
                <Nav bsStyle="pills" stacked>
                    <LinkContainer exact to="/">
                        <NavItem key={'all'} active={history.location.pathname === '/'}>
                            <span>All Posts</span>
                        </NavItem>
                    </LinkContainer>
                    {props.availableCategories && props.availableCategories.map((category, index) => (
                        <LinkContainer key={index} to={'/' + category.name}>
                            <NavItem active={history.location.pathname === '/' + category.name}>
                                <span>{category.name}</span>
                            </NavItem>
                        </LinkContainer>
                    ))}
                </Nav>
            </div>
        );

}

export default Navigation;
