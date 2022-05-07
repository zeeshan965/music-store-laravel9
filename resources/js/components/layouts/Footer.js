import React from 'react';
import {Link} from "react-router-dom";

export default function Footer(props) {
    return (
        <>
            <footer className="main-footer">
                <strong>Copyright &copy; 2022
                    <Link to={props.baseUrl}> {props.appName} </Link>.
                </strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0
                </div>
            </footer>
        </>
    );
}

