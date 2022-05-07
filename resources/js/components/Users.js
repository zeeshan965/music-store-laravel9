import React from 'react';
import {useState, useEffect} from "react";
import http from "../http"

export default function Users(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        http.get('/users').then(response => {
            const res = response.data;
            console.log(res)
            setUsers(res.users);
        })
    }

    const blockUser = (id) => {
        http.post('/users/' + id).then(res => {
            fetchAllUsers();
        })
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Manage Users</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{++index}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {/*<Link className="btn btn-info"
                                                          to={{pathname: "/edit/" + user.id}}>Edit</Link>&nbsp;
                                                    <Link className="btn btn-primary"
                                                          to={{pathname: "/view/" + user.id}}>View</Link>&nbsp;
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={() => {
                                                                deleteUser(user.id)
                                                            }}
                                                    >Delete
                                                    </button>*/}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
