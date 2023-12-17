import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveLeave } from '../../features/leave/leaveSlice';


function Leave(props) {
    const { empid } = props
    
    const leave_status = useSelector((state) => state.leave.leave_status)

    const dispatch = useDispatch()
    const getTodayDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
    }
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(getTodayDate);
    const handleSubmit = (e) => {
        dispatch(saveLeave({empid,reason,date}))
        console.log('assadds',leave_status)
        
        setReason('')
        setDate(getTodayDate)
        e.preventDefault();
    }

    return (
        <>
        <form onSubmit={e => { handleSubmit(e) }}>
            <label>Reason:</label>
            <br />
            <input
                name='reason'
                type='text'
                value={reason}
                onChange={e => setReason(e.target.value)}
            />
            <br />
            <label>Date:</label>
            <br />
            <input
                name='date'
                type='date'
                value={date}
                required
                onChange={e => setDate(e.target.value)}
            />
            <br />
            <input
                type='submit'
                value='Submit'
            />
        </form>
        {leave_status.message}
        </>
        
    )
}

export default Leave;