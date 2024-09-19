import React, { useEffect, useState } from 'react';
import './nav.css';
import {Link, useNavigate} from 'react-router-dom';
const Nav = () => {
    const [loggedInUser,setLoggedInUser]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
      setLoggedInUser(localStorage.getItem("loggedInUser"));
    },[])

    const logout=()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    }
  return (
    <div>
        <header>
            <nav className='Navigation'>
                <ul className='navList'>
                    <li className='navItems'><Link to="/">Home</Link></li>
                    <li className='navItem'><Link to="/Employee">EmployeeList</Link></li>
                </ul>
                <ul className='loginList'>
                <li className='navItems'>Akash</li>
                <li className='navItems' onClick={logout}>Logout</li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Nav