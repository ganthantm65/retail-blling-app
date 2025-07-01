import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import ManageCategory from '../pages/manageCategory'
import ManageProducts from '../pages/manageProducts'
import ProductDisplay from '../pages/ProductDisplay'
import CartPage from '../pages/CartPage'

function LinkRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/manageCategory' element={<ManageCategory/>}/>
            <Route path='/manageProducts' element={<ManageProducts/>}/>
            <Route path='/product' element={<ProductDisplay/>}/>
            <Route path='/cart' element={<CartPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default LinkRouter
