import React from 'react'
import { Link } from 'react-router-dom'
import './lsit.css'
const EmployeeList = () => {
  return (
    <div className='employee-container'>
      <div className="first-employee">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvLYtKU3Uqcy0pRZBBfNZglZuBcEwttH3wQ&s" alt="allu " />
        <h2>Arjun</h2>
        <p>arjun@gmail.com</p>
        <p>+91 9876543210</p>
        <p>Designer</p>
        <p>male</p>
        <p>BCA</p>
        <p>13/08/2021</p>
        <button><Link to="/edit">Edit</Link></button>
      </div>
      <div className="second-employee">
        <img src="https://wallpapers.com/images/hd/bike-thalapathy-vijay-new-6ovty18w8im6y9ly.jpg" alt="thala " id='thala' />
        <h2>Akash</h2>
        <p>akash@@gmail.com</p>
        <p>+91 7698543210</p>
        <p>Designer</p>
        <p>male</p>
        <p>BCA</p>
        <p>17/08/2021</p>
        <button><Link to="/edit">Edit</Link></button>
      </div>
    </div>
  )
}

export default EmployeeList