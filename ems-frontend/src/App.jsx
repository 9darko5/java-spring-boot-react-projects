import React, { useState } from 'react';
import RunnerComponent from './components/RunnerComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListRunnerComponent from './components/ListRunnerComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorPageComponent from './components/ErrorPageComponent'
import './App.css'
import RunnerDetailsComponent from './components/RunnerDetailsComponent';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* https://localhost:3000/login*/}
          <Route path='/login' element={<LoginComponent />} />
          {/* https://localhost:3000/register*/}
          <Route path='/register' element={<RegisterComponent />} />
          {/* https://localhost:3000*/}
          <Route path='/' element={ <ProtectedRoute><ListRunnerComponent /></ProtectedRoute>}></Route>
          {/* https://localhost:3000/runners*/}
          <Route path='/runners' element={ <ProtectedRoute><ListRunnerComponent /></ProtectedRoute>}></Route>
          {/* https://localhost:3000/add-runner*/}
          <Route path='/add-runner' element={ <ProtectedRoute><RunnerComponent /></ProtectedRoute> }></Route>
          {/* https://localhost:3000/edit-runner*/}
          <Route path='/edit-runner/:id' element={ <ProtectedRoute><RunnerComponent /></ProtectedRoute> }></Route>
          {/* https://localhost:3000/runner-details*/}
          <Route path='/runner-details/:id' element={ <ProtectedRoute><RunnerDetailsComponent /></ProtectedRoute> }></Route>
          {/* https://localhost:3000/error*/}
          <Route path="/error" element={<ErrorPageComponent />} />
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
