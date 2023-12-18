// import React from 'react';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveLeave } from '../../features/leave/leaveSlice';
import { incrementLeavesTaken, decrementLeavesRemaining } from '../../features/leave/leaveSlice'
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Alert } from '@themesberg/react-bootstrap';
import 'react-datetime/css/react-datetime.css';



function Leave(props) {
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const empid = useSelector((state) => state.employee.employee_detail.id)



    const leave_status = useSelector((state) => state.leave.leave_status)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        dispatch(saveLeave({ empid, reason, date })).then(
            response => {
                if (response.payload.status) {
                    dispatch(incrementLeavesTaken());
                    dispatch(decrementLeavesRemaining());
                }
            }
        )

        setReason("")
        setDate("")
        e.preventDefault();
    }
    const [hiddenAlerts, setHiddenAlerts] = React.useState([]);
    const shouldShowAlert = (alertId) => (
        hiddenAlerts.indexOf(alertId) === -1
    );
    const onClose = (alertId) => {
        const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
        setHiddenAlerts(hiddenAlertsUpdated);
    };

    return (
        <>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Leave Form</h5>
                    <Form onSubmit={e => { handleSubmit(e) }}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="reason">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control required type="text" />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="date">
                                    <Form.Label>Date</Form.Label>
                                    <input
                                        name='date'
                                        type='date'
                                        value={date}
                                        required
                                        onChange={e => setDate(e.target.value)}
                                    />
                                    {/* <Datetime
                                    timeFormat={false}
                                    onChange={setDate(date)}
                                    renderInput={(props, openCalendar) => (
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={date ? moment(date).format("MM/DD/YYYY") : ""}
                                                placeholder="mm/dd/yyyy"
                                                onFocus={openCalendar}
                                                onChange={() => { }} />
                                        </InputGroup>
                                    )} /> */}
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="mt-3">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

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
        </>

    )
}

export default Leave;