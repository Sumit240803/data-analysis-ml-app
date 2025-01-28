
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/ui/general/Footer'
import Navbar from './components/ui/general/Navbar'
import Home from './pages/Home'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
