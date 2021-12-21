import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/hello">Hello page</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/clients-list">Clients list</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/about">About us</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/working-hours">Working hours</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/clicker">Clicker</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/form">Form</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
