import React from 'react'
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div>Dashbard
      <button type="button"> <Link to="/register">Register</Link></button>
    </div>
  )
}

export default Home