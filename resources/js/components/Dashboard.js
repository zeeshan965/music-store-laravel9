import React from 'react';

export default function Dashboard(props) {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            {props.userType ? (
                                <>
                                    <h1 className="m-0">{props.userType} Dashboard</h1>
                                    {/*<p>You are logged in to {props.userType} side!</p>*/}
                                </>
                            ) : null}
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v2</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                        <span className="info-box-icon bg-info elevation-1">
                                            <i className="fas fa-users"/></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Users</span>
                                    <span className="info-box-number">10<small>%</small></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                        <span className="info-box-icon bg-danger elevation-1">
                                            <i className="fas fa-thumbs-up"/></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Audios</span>
                                    <span className="info-box-number">41,410</span>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix hidden-md-up"/>

                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                        <span className="info-box-icon bg-success elevation-1">
                                            <i className="fas fa-shopping-cart"/></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Videos</span>
                                    <span className="info-box-number">760</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                        <span className="info-box-icon bg-warning elevation-1">
                                            <i className="fas fa-users"/></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Sales</span>
                                    <span className="info-box-number">2,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
