import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
        <Link to="/">Jiak Simi?</Link> || 
        <Link to="/saved">Saved</Link>
    </div>
  )
}

export default NavBar;