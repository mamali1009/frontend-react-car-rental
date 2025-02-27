import React, { useState } from "react";
import { FaReact, FaBars, FaBeer } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { HiOutlineUser, HiX } from 'react-icons/hi';
import './style.css';

const data = [
    {
        label: "HOME",
        to: "/home"
    },
    {
        label: "ABOUT",
        to: "/about"
    },
    {
        label: "PRODUCTS",
        to: "/product"
    },
    {
        label: "LOGIN",
        to: "/login"
    }
];

const Navbar = () => {
    const [toggleIcon, setToggleIcon] = useState(false);
    const handleToggleIcon = () => {
        setToggleIcon(!toggleIcon);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar_container">
                    <Link to={'/'} className="navbar_container_logo">
                        <FaReact size={30} />
                    </Link>
                </div>
                <ul className={`navbar_container_menu ${toggleIcon ? "active" : ""}`}>
                    {data.map((item, key) => (
                        <li key={key} className="navbar_container_menu_item">
                            <Link className="navbar_container_menu_item_links" to={item.to}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-icon" onClick={handleToggleIcon}>
                    {toggleIcon ? <HiX size={30} /> : <FaBars size={30} />}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
