import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBar">
        <Link to="/">Home</Link>
        <Link to="/saved">Saved</Link>
    </div>
  )
}

export default NavBar;