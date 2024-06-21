import  { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Messages from './components/Messages';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Doctors from './components/Doctors';
import Sidebar from './components/Sidebar';
import { Context } from './main';
import axios from 'axios';
import "./App.css"



const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", { withCredentials: true })
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/doctor/addnew' element={<AddNewDoctor />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/sidebar' element={<Sidebar />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>

    </>
  )
}

export default App
