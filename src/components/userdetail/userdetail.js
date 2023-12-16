import React from 'react'
import './userdetail.css'

function UserDetail(props) {
    const { user } = props

    return (

        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.phone}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">Bay Area, San Francisco, CA</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Leave Taken</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.id}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Leave Remaining</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.id}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Total Leave </p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{user.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserDetail