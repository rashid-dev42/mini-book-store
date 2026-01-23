import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <h1 className="Header-heading">MINI-BOOK-STORE</h1>
      <hr />
      <div className="Header-navbar">
        <Link className="Header-navbar-link" to="/all-books">All Books</Link>
        <Link className="Header-navbar-link" to="/single-book">Single Book</Link>
        <Link className="Header-navbar-link" to="/add-book">Add</Link>
        <Link className="Header-navbar-link" to="/update-book">Update</Link>
        <Link className="Header-navbar-link" to="/delete-book">Delete</Link>
      </div>
    </div>
  );
};

export default Header;