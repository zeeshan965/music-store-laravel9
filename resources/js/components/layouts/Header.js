import React from 'react';

export default function Header(props) {
    console.log(props)

    function logout(e) {
        e.preventDefault();
        document.getElementById('logout-form').submit();
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars"/>
                        </a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">

                            <img srcSet={props.baseUrl + 'dist/img/user2-160x160.jpg'}
                                 className="user-image img-circle elevation-2" alt="User Image"/>
                            <span className="d-none d-md-inline">{props.loggedInUser.name}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

                            <li className="user-header bg-primary">
                                <img srcSet={props.baseUrl + 'dist/img/user2-160x160.jpg'}
                                     className="img-circle elevation-2" alt="User Image"/>
                                <p>
                                    {props.loggedInUser.name} - {props.userType}
                                </p>
                            </li>

                            <li className="user-footer">
                                <a href={props.baseUrl + 'admin/password/change'}
                                   className="btn btn-default btn-flat">Change Password</a>
                                <a href={props.baseUrl + 'admin/logout'} onClick={logout}
                                   className="btn btn-default btn-flat float-right">Sign out</a>

                                <form id="logout-form" action={props.baseUrl + 'admin/logout'} method="POST"
                                      style={{display: 'none'}}
                                >
                                    <input type="hidden" name="_token" value={props.token}/>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
}
