import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'
import leaveSlice from '../features/leave/leaveSlice'

export default configureStore({
  reducer: {
    employee : employeeSlice,
    leave : leaveSlice
  },
})