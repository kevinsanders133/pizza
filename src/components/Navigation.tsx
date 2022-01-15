import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <Link to="/home">Menu</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/about">About us</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/working-hours">Working hours</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
