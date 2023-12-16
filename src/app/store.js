import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employee/employeeSlice'

export default configureStore({
  reducer: {
    employee : employeeSlice,
  },
})