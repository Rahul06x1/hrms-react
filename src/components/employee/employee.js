import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EmployeeDetail from '../employeedetail/employeedetail'
import { fetchEmployees, fetchEmployeeDetail } from '../../features/employee/employeeSlice'
import './employee.css'

function Employee() {
    const employees = useSelector((state) => state.employee.employees)
    const employee = useSelector((state) => state.employee.employee_detail)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [])

    const userHandler = (empid) => {
        dispatch(fetchEmployeeDetail(empid))
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            {employees.map((employee, index) =>
                                <div key={employee.id} className="row">
                                    <div>
                                        <p className="name mb-0" onClick={() => userHandler(employee.id)}>{index + 1}. {employee.fname} {employee.lname}</p>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    {employee.length !== 0 && <EmployeeDetail employee={employee} />}
                </div>
            </div>

        </div>
    )
}

export default Employee