import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import ManageCategory from '../pages/manageCategory'
import ManageProducts from '../pages/manageProducts'

function LinkRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/manageCategory' element={<ManageCategory/>}/>
            <Route path='/manageProducts' element={<ManageProducts/>}/>'
        </Routes>
    </BrowserRouter>
  )
}

export default LinkRouter
