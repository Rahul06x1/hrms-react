import React from 'react';
import { saveAs } from 'file-saver';
import { fetchVcard } from '../../features/vcard/vcardSlice';
import { useSelector, useDispatch } from 'react-redux'


const Vcard = () => {
    const vcard = useSelector((state) => state.vcard.vcard)
    const employee = useSelector((state) => state.employee.employee_detail)
    const dispatch = useDispatch()
    const handleDownload = () => {
        dispatch(fetchVcard(employee.id))
        const file = new Blob([vcard.vcard], { type: 'text/plain;charset=utf-8' });
        saveAs(file, `${employee.fname.toLowerCase()}_${employee.lname.toLowerCase()}_vcard.txt`);
    };

    return (
        <button onClick={handleDownload}>
            Download vCard
        </button>
    );
};

export default Vcard;