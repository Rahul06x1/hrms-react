import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Form, Button, Modal } from '@themesberg/react-bootstrap';
import 'react-datetime/css/react-datetime.css';

import { saveLeave } from '../../features/leave/leaveSlice';
import { incrementLeavesTaken, decrementLeavesRemaining } from '../../features/leave/leaveSlice'



function Leave() {
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [showDefault, setShowDefault] = useState(false);
    const empid = useSelector((state) => state.employee.employee_detail.id)

    const handleClose = () => setShowDefault(false);

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        dispatch(saveLeave({ empid, reason, date })).then(
            response => {
                if (response.payload.success) {
                    dispatch(incrementLeavesTaken());
                    dispatch(decrementLeavesRemaining());
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

                        <div className="mt-3">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>

    )
}

export default Leave;