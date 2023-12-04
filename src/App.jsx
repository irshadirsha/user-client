import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
       <Route path='/' element={<HomePage/>}></Route>
       <Route path='/signup' element={<SignupPage/>}></Route>
       <Route path='/login' element={<LoginPage/>}></Route>
       </Routes>
       </BrowserRouter>
      </div>
    </>
  )
}

export default App
