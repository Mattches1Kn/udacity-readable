import React from 'react';
import {Link} from 'react-router-dom';

function NoRouteMatch()  {

    return (
        <div>
            <div>
                <h1>404 : Ups, this page doesn't exist!</h1>
                <Link to="/" ><button type="button" className="btn btn-primary btn-lg"> Go to start page </button></Link>
            </div>
        </div>
    );
}

export default NoRouteMatch;
