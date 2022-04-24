import React from 'react';
import Header from "./layouts/Header";
import Loader from "./layouts/Loader";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import {Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";

export default function App(props) {
    const appName = props.appName;
    const userType = props.userType;
    const baseUrl = props.baseUrl;
    const loggedInUser = props.loggedInUser;
    const token = props.token;
    return (
        <>
            <div className="wrapper">
                <Loader baseUrl={baseUrl}/>
                <Header appName={appName} userType={userType} baseUrl={baseUrl} loggedInUser={loggedInUser}
                        token={token}/>
                <Sidebar baseUrl={baseUrl}/>
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/admin/" element={<Dashboard/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </>
    );
}
