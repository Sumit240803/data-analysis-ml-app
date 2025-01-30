
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/ui/general/Footer'
import Navbar from './components/ui/general/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import Create from './pages/user/Create'


function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/create-environment' element={<Create/>}/>
      </Routes>
    
    </>
  )
}

export default App
