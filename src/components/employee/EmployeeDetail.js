import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployees, fetchEmployeeDetail } from '../../features/employee/employeeSlice'
import { setInitialLeavesTaken, setInitialLeavesRemaining } from '../../features/leave/leaveSlice'
import Leave from "../leave/leave";



export const EmployeeDetail = () => {
    const [leaveFormVisible, setLeaveFormVisible] = useState(false)
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
        <section style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow>
                    <MDBCol lg="" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor: '#262B40' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    <MDBTypography tag="h5">{employee.fname} {employee.lname}</MDBTypography>
                                    <MDBCardText>{employee.title}</MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{employee.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{employee.phone}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6">Leave Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Taken</MDBTypography>
                                                <MDBCardText className="text-muted">{leaves_taken}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Remaining</MDBTypography>
                                                <MDBCardText className="text-muted">{leaves_remaining}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Total</MDBTypography>
                                                <MDBCardText className="text-muted">{employee.total_leaves}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <Row >
                    <Col>
                        <Button onClick={() => { setLeaveFormVisible(!leaveFormVisible) }}>Add Leave</Button>
                    </Col>
                    <Col>
                        <Button>Download vCard</Button>
                    </Col>
                    <Col>
                        <Button>Generate qrCode</Button>
                    </Col>
                </Row>

            </MDBContainer>
            {leaveFormVisible && <Leave />}
            <div className="mt-3">
                <Button onClick={() => userHandler(employee.prev)}>Previous</Button>
                <Button onClick={() => userHandler(employee.next)}>Next</Button>
            </div>

        </section>
    )
};