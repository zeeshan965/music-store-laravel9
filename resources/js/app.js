/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import React from "react";
import {render} from "react-dom";
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';

window.React = React;
render(
    <BrowserRouter>
        <App appName={appName} userType={userType} baseUrl={base_url} loggedInUser={loggedInUser} token={csrf_token}/>
    </BrowserRouter>, document.getElementById("app")
);
