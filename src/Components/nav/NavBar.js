import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/collections">My Collections</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/series">My Series</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/cards">My Cards</Link>
            </li>
        </ul>
    )
}