import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import EmployeeList from './Component/EmployeeList';
import EmployeeEdit from './Component/EmployeeEdit';
import Nav from './Component/Nav';
const App = () => {
  return (
    <>
     <Router>
      <Nav/>
      <Routes>
        <Route path='/' index element={<Home/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route path='/employee'  element={<EmployeeList/>}/>
        <Route path='/edit'  element={<EmployeeEdit/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App;