import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import QRCode from 'qrcode.react';
import { Button, Modal } from '@themesberg/react-bootstrap';

import { fetchVcard } from '../../features/vcard/vcardSlice';

const QRCodeGenerator = () => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const vcard = useSelector((state) => state.vcard.vcard)
    const employee = useSelector((state) => state.employee.employee_detail)
    const dispatch = useDispatch()


    const generateQRCode = () => {
        dispatch(fetchVcard(employee.id))
    };

    const downloadQRCode = () => {
        // Get the canvas containing the QR code
        const canvas = document.getElementById('qrcode');

        // Create a temporary link element
        const link = document.createElement('a');

        // Set the href attribute to the data URL of the QR code image
        link.href = canvas.toDataURL('image/png');

        // Set the download attribute with the desired filename
        link.download = `${employee.fname.toLowerCase()}_${employee.lname.toLowerCase()}_qrcode.png`;

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };

    return (
        <>
            <Button variant="primary" onClick={() => {
                setShowDefault(true);
                generateQRCode()
            }}>Generate qrCode</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h6">QRCode</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <QRCode id="qrcode" value={vcard.vcard} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={downloadQRCode}>Download</Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default QRCodeGenerator;
