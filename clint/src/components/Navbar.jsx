import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link  className="link" to="/"> Signup page</Link>
      </div>
      <div>
        <Link className="link" to="/home">Home Page</Link>
      </div>
    </div>
  );
};

export default Navbar;
