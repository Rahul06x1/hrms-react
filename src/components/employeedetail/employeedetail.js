import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './employeedetail.css'
import Leave from '../leave/leave'
import { setInitialLeavesTaken, setInitialLeavesRemaining } from '../../features/leave/leaveSlice'


function EmployeeDetail(props) {
    const { employee } = props
    const leaves_taken = useSelector((state) => state.leave.leaves_taken);
    const leaves_remaining = useSelector((state) => state.leave.leaves_remaining);

    const dispatch = useDispatch()


    useEffect(() => {
        // Fetch or obtain the data you want to use as the initial state
        const fetchData = async () => {
            const leaves_taken = employee.leaves_taken;
            const leaves_remaining = employee.total_leaves - employee.leaves_taken;
            dispatch(setInitialLeavesTaken(leaves_taken));
            dispatch(setInitialLeavesRemaining(leaves_remaining));
        };
    
        // Call the fetchData function
        fetchData();
      }, [employee,dispatch]);

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
            <Leave empid={employee.id}/>
        </div>


    )
}

export default EmployeeDetail