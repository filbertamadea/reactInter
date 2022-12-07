import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'
import Login from './pages/login'
import Register from './pages/register'


function Router() {
    let token = localStorage.getItem('token')
   
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={token !== null ? (<Home/>) : (<Login/>)}  />
                <Route path="/pages/:id" element={<Detail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router