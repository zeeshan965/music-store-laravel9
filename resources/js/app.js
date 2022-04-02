/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import React, {StrictMode} from "react";
import {render} from "react-dom";
import Welcome from "./Pages/Welcome";

window.React = React;
render(
    <StrictMode>
        <Welcome/>
    </StrictMode>, document.getElementById("app")
);
