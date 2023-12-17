import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './employeedetail.css'
import Leave from '../leave/leave'
import { setInitialLeavesTaken, setInitialLeavesRemaining } from '../../features/leave/leaveSlice'
import { fetchEmployeeDetail } from '../../features/employee/employeeSlice'
import Vcard from '../vcard/vcard'
import QRCodeGenerator from '../qrcode/qrcode'


function EmployeeDetail() {
    const leaves_taken = useSelector((state) => state.leave.leaves_taken);
    const leaves_remaining = useSelector((state) => state.leave.leaves_remaining);
    const employee = useSelector((state) => state.employee.employee_detail)

    const dispatch = useDispatch()


    useEffect(() => {
        const fetchLeaveData = async () => {
            const leaves_taken = employee.leaves_taken;
            const leaves_remaining = employee.total_leaves - employee.leaves_taken;
            dispatch(setInitialLeavesTaken(leaves_taken));
            dispatch(setInitialLeavesRemaining(leaves_remaining));
        };

        // Call the fetchLeaveData function
        fetchLeaveData();
    }, [employee, dispatch]);

    const userHandler = (empid) => {
        dispatch(fetchEmployeeDetail(empid))
    }

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
                            <p className="value mb-0">{leaves_taken}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="label mb-0">Leave Remaining</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="value mb-0">{leaves_remaining}</p>
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
            <Leave empid={employee.id} />
            <Vcard />
            <QRCodeGenerator />
            <button onClick={() => userHandler(employee.prev)}>Previous</button>
            <button onClick={() => userHandler(employee.next)}>Next</button>
        </div>


    )
}

export default EmployeeDetail