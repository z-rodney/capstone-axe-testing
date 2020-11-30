import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/account">Account</Link>
        <Link to="/friends">Friends</Link>
      </nav>
    </div>
  )
}

export default NavBar
