import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { fetchVcard } from '../../features/vcard/vcardSlice';
import { useSelector, useDispatch } from 'react-redux'

const QRCodeGenerator = () => {
    const [qrCodeVisible, setQRCodeVisible] = useState(false);
    const vcard = useSelector((state) => state.vcard.vcard)
    const employee = useSelector((state) => state.employee.employee_detail)
    const dispatch = useDispatch()

    useEffect(() => {
        setQRCodeVisible(false);
    }, [employee])
    
    const generateQRCode = () => {
        dispatch(fetchVcard(employee.id))
        setQRCodeVisible(true)
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
        <div>
            {/* Button to generate and download QR code */}
            {!qrCodeVisible && <button onClick={generateQRCode}>Generate QR Code</button>}
            {qrCodeVisible && <button onClick={downloadQRCode}>Download QR Code</button>}
            {/* Display QR code */}
            {qrCodeVisible && <QRCode id="qrcode" value={vcard.vcard} />}
        </div>
    );
};

export default QRCodeGenerator;
