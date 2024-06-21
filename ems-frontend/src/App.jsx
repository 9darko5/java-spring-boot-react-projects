import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
          <Route path='/' element={ <ProtectedRoute><ListEmployeeComponent /></ProtectedRoute>}></Route>
          {/* https://localhost:3000/employees*/}
          <Route path='/employees' element={ <ProtectedRoute><ListEmployeeComponent /></ProtectedRoute>}></Route>
          {/* https://localhost:3000/add-employee*/}
          <Route path='/add-employee' element={ <ProtectedRoute><EmployeeComponent /></ProtectedRoute> }></Route>
          {/* https://localhost:3000/edit-employee*/}
          <Route path='/edit-employee/:id' element={ <ProtectedRoute><EmployeeComponent /></ProtectedRoute> }></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
