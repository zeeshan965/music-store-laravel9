import React from 'react';
import Header from "./layouts/Header";
import Loader from "./layouts/Loader";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import {Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Users from "./Users";

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
                        <Route path="/admin/users" element={<Users/>}/>
                    </Routes>
                </div>
                <Footer appName={appName} baseUrl={baseUrl}/>
            </div>
        </>
    );
}
