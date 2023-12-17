import React from 'react'
import './employeedetail.css'
import Leave from '../leave/leave'

function EmployeeDetail(props) {
    const { employee } = props

    return (

        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">ID</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.id}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Name</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.fname} {employee.lname}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.phone}</p>
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
                            <p className="value mb-0">{employee.leaves_taken}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Leave Remaining</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.total_leaves - employee.leaves_taken}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Total Leave </p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{employee.total_leaves}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Leave empid={employee.id}/>
        </div>


    )
}

export default EmployeeDetail