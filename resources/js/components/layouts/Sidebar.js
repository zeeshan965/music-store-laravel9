import React from 'react';
import {Link} from "react-router-dom";

export default function Sidebar(props) {
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to={"/admin"} className="brand-link">
                    <img srcSet={props.baseUrl + 'dist/img/AdminLTELogo.png'} alt="AdminLTE Logo"
                         className="brand-image img-circle elevation-3" style={{Opacity: '.8'}}/>
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li className="nav-item">
                                <Link to={"/admin/users"} className="nav-link">
                                    <i className="nav-icon far fa-image"/>
                                    <p>Users</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="pages/gallery.html" className="nav-link">
                                    <i className="nav-icon far fa-image"></i>
                                    <p>
                                        Subscriptions
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/gallery.html" className="nav-link">
                                    <i className="nav-icon far fa-image"></i>
                                    <p>
                                        Albums
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/gallery.html" className="nav-link">
                                    <i className="nav-icon fas fa-photo-video"/>
                                    <p>
                                        Media
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href={props.baseUrl + 'admin/show'} className="nav-link">
                                    <i className="nav-icon fas fa-users fa-fw"/>
                                    <p>Manage Admins</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={props.baseUrl + 'admin/roles'}>
                                    <i className="nav-icon fas fa-user-tag fa-fw"/>
                                    <p>Manage Roles</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

