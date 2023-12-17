import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'
import leaveSlice from '../features/leave/leaveSlice'
import vcardSlice from '../features/vcard/vcardSlice'

export default configureStore({
  reducer: {
    employee: employeeSlice,
    leave: leaveSlice,
    vcard: vcardSlice
  },
})