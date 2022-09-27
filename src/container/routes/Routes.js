import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../../App.less'
import App from '../../app'
import Auth from '../../app/auth'
import Appartments from '../../app/appartments'
import ViewAppt from '../../app/appartments/ViewAppt'
import Dashboard from '../../app/dashboard'
import Users from '../../app/users'
import Messages from '../../app/messages'
import FacilityManagement from '../../app/facility-management'
import Expense from '../../app/expense'
import System from '../../app/system'

import { GlobalModal } from '../context/GlobalModal'
import UserRoutes from './ProtectedRoutes'

export default function AppRoutes() {
  return (
    <GlobalModal>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<UserRoutes />}>
            <Route path="/" element={<App />} >
              <Route path="appartments" element={<Appartments />} />
              <Route path="appartments/:id" element={<ViewAppt />} />
              <Route path="users" element={<Users />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="message" element={<Messages />} />
              <Route path="expense" element={<Expense />} />
              <Route path="system" element={<System />} />
              <Route path="facility-management" element={<FacilityManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalModal>
  )
}
