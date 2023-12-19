import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, Table } from '@themesberg/react-bootstrap';

import { fetchEmployees, fetchEmployeeDetail } from '../../features/employee/employeeSlice'



export const EmployeeList = () => {
    const employees = useSelector((state) => state.employee.employees)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch])

    const userHandler = (empid) => {
        dispatch(fetchEmployeeDetail(empid))
    }

    return (
        <Card border="light" className="shadow-sm">
            <Card.Body className="pb-0">
                <Table responsive className="table-centered table-nowrap rounded mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th className="border-0">id</th>
                            <th className="border-0">name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) =>
                            <tr key={index} onClick={() => userHandler(employee.id)}>
                                <td className="fw-bold border-0">
                                    {employee.id}
                                </td>
                                <td className="border-0">
                                    <Card.Link className="d-flex align-items-center">
                                        <div><span className="h6">{employee.fname} {employee.lname}</span></div>
                                    </Card.Link>
                                </td>

                            </tr>
                        )
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};