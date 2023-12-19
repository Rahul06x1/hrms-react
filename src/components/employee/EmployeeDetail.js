import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver';
import { Col, Row, Button, Alert } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import { fetchEmployeeDetail } from '../../features/employee/employeeSlice'
import { setInitialLeavesTaken, setInitialLeavesRemaining, emptyLeaveStatus } from '../../features/leave/leaveSlice'
import Leave from "../leave/leave";
import QRCodeGenerator from '../qrcode/qrcode'
import { fetchVcard } from '../../features/vcard/vcardSlice';



export const EmployeeDetail = () => {
    const prevButtonRef = useRef(null)
    const nextButtonRef = useRef(null)
    const [hiddenAlerts, setHiddenAlerts] = React.useState([]);
    const dispatch = useDispatch()
    const leaves_taken = useSelector((state) => state.leave.leaves_taken);
    const leaves_remaining = useSelector((state) => state.leave.leaves_remaining);
    const employee = useSelector((state) => state.employee.employee_detail)
    const vcard = useSelector((state) => state.vcard.vcard)
    const leave_status = useSelector((state) => state.leave.leave_status)

    useEffect(() => {
        const fetchLeaveData = async () => {
            const leaves_taken = employee.leaves_taken;
            const leaves_remaining = employee.total_leaves - employee.leaves_taken;
            dispatch(setInitialLeavesTaken(leaves_taken));
            dispatch(setInitialLeavesRemaining(leaves_remaining));
        };

        fetchLeaveData();
        dispatch(fetchVcard(employee.id))

        return () => {
            setHiddenAlerts([])
            dispatch(emptyLeaveStatus())
        }

    }, [employee, dispatch]);

    const shouldShowAlert = (alertId) => (
        hiddenAlerts.indexOf(alertId) === -1
    );

    const onClose = (alertId) => {
        const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
        setHiddenAlerts(hiddenAlertsUpdated);
    };

    const userHandler = (empid) => {
        dispatch(fetchEmployeeDetail(empid))
        prevButtonRef.current.blur();
        nextButtonRef.current.blur();
    }

    const downloadVcard = () => {
        const file = new Blob([vcard.vcard], { type: 'text/plain;charset=utf-8' });
        saveAs(file, `${employee.fname.toLowerCase()}_${employee.lname.toLowerCase()}_vcard.txt`);
    };

    return (
        <section >
            <MDBContainer className="py-5 h-100">
                {leave_status.length !== 0 && leave_status.status &&
                    <Alert
                        variant="success"
                        show={shouldShowAlert("success")}
                        onClose={() => onClose("success")}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {leave_status.message}
                            </div>
                            <Button variant="close" size="xs" onClick={() => onClose("success")} />
                        </div>
                    </Alert>}
                {leave_status.length !== 0 && !leave_status.status &&
                    <Alert
                        variant="danger"
                        show={shouldShowAlert("danger")}
                        onClose={() => onClose("danger")}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {leave_status.message}
                            </div>
                            <Button variant="close" size="xs" onClick={() => onClose("danger")} />
                        </div>
                    </Alert>}
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
                        <Leave />
                    </Col>
                    <Col>
                        <Button onClick={downloadVcard}>Download vCard</Button>
                    </Col>
                    <Col>
                        <QRCodeGenerator />
                    </Col>
                </Row>

            </MDBContainer>

            <div className="mt-3">
                <Col>
                    <Button variant="link" onClick={() => userHandler(employee.prev)} ref={prevButtonRef}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </Button>
                    <Button variant="link" onClick={() => userHandler(employee.next)} ref={nextButtonRef}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Button>
                </Col>
            </div>

        </section>
    )
};