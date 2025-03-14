import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Contact } from './components/pages/Contact'
import { Transactions } from './components/pages/Transactions'
import Register from './components/pages/login/Register'
import Login from './components/pages/login/Login'
import ClickToLog from './components/pages/login/ClickToLog'
import { ToastContainer } from 'react-toastify'
import { Verification } from './components/pages/Verification'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
      {/* <Navbar/> */}
      <Routes>
      <Route path='/' element={<ClickToLog/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/transactions' element={<Transactions/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/verification' element={<Verification/>}></Route>
     </Routes>
    </>
  )
}

export default App
