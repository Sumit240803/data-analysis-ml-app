
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import Create from './pages/user/Create'
import Env from './pages/user/Env'


function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/create-environment' element={<Create/>}/>
        <Route path='/env/id/:envId' element={<Env/>}/>
      </Routes>
    
    </>
  )
}

export default App
