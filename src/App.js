import './App.css';


import { BrowserRouter, Routes, Navigate, Link, Route } from 'react-router-dom'

import Portfolio from './components/Portfolio';
import Admin from './components/Admin/Admin';
import Profile from './components/Admin/Profile';
import UpdateImage from './components/Admin/UpdateImage';
import Signup from './components/Admin/Signup';
import Login from './components/Admin/Login';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Portfolio />}></Route>
        <Route path="/adminlogin" element={isLoggedIn =="true" ? <Admin /> : <Login />}></Route>
        <Route path="/adminsignup" element={<Signup />}></Route>
        <Route path='/admin' element={isLoggedIn =="true" ? <Admin /> : <Navigate to="/adminlogin" /> }></Route>
        <Route path='/profile' element={isLoggedIn =="true" ? <Profile /> : <Navigate to="/adminlogin" />}></Route>
        <Route path='/updateimage' element={isLoggedIn =="true" ? <UpdateImage /> : <Navigate to="/adminlogin" />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
