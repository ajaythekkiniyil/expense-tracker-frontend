import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  const userId = localStorage.getItem('userId') || false
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={userId ? <Home /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
