import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Form } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';

import { saveLeave } from '../../features/leave/leaveSlice';
import { incrementLeavesTaken, decrementLeavesRemaining, emptyLeaveStatus } from '../../features/leave/leaveSlice'



function Leave() {
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [leaveCounter, setLeaveCounter] = useState(0);
    const [showDefault, setShowDefault] = useState(false);
    const empid = useSelector((state) => state.employee.employee_detail.id)
    const leave_status = useSelector((state) => state.leave.leave_status)

    const handleClose = () => {
        setShowDefault(false)
        dispatch(emptyLeaveStatus())
        setLeaveCounter(0)
    };

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        dispatch(saveLeave({ empid, reason, date })).then(
            response => {
                if (response.payload.success) {
                    dispatch(incrementLeavesTaken());
                    dispatch(decrementLeavesRemaining());
                    setLeaveCounter(leaveCounter + 1)
                }
            }
        )

        setReason("")
        setDate("")
        e.preventDefault();
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShowDefault(true)}>Add Leave</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">Leave Form</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
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
                                    <Form.Control
                                        name='date'
                                        type='date'
                                        value={date}
                                        required
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9} className="mb-3" >
                                {leaveCounter === 1 && leave_status.success && <p className="text-success">{leave_status.message}</p>}
                                {leaveCounter > 1 && leave_status.success && <p className="text-success">{leave_status.message} #{leaveCounter}</p>}
                                {!leave_status.success && <p className="text-danger">{leave_status.message}</p>}
                            </Col>
                            <Col md={3} className="mb-3">
                                <Button variant="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

            </Modal>
        </>

    )
}

export default Leave;