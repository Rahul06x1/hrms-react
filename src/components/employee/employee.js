import { EmployeeDetail } from "./employeeDetail";
import { EmployeeList } from "./employeeList";
import { Row, Col } from '@themesberg/react-bootstrap';
import { useSelector } from 'react-redux'


export default function Employee() {
    const employee = useSelector((state) => state.employee.employee_detail)

    return (
        <>
            <Row>
                <Col xs={6} xl={3}>
                    <EmployeeList />
                </Col>
                <Col>
                    {employee.length !== 0 && <EmployeeDetail />}
                </Col>
            </Row>

        </>
    )
}
