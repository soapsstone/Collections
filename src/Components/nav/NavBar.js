import React, { Component } from 'react';
import { Navbar, BImg } from 'bootstrap-4-react';
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    const bootstrap_icon = 'https://image.flaticon.com/icons/png/128/895/895930.png';

    return (
      <Navbar light bg="dark">
        <Navbar.Brand href="#">
          <BImg
            src={bootstrap_icon}
            width="30"
            height="30"
            display="inline-block"
            align="top"
            mr="1"
          />
        </Navbar.Brand>
        <ul className="navbar-container">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/collections">My Collections</Link>
            </li>
        {/* <li className="navbar__item">
                <Link className="navbar__link" to="/cards">My Cards</Link>
            </li> */}
            </ul>
      </Navbar>
    )
}