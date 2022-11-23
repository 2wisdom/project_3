import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginBtn from './buttons/LoginBtn';
import Nav from "../styles/Nav.module.css"
const NavBar = () => {
    const navigate = useNavigate();
    console.log('Nav',Nav);
    console.log('Nav.logoTitle',Nav.logoTitle);
    return(
        <>
        <div className={Nav.nav}>
            <div className={Nav.navContainer}>
            <a className={Nav.logo} onClick={() => {
                navigate("/");
            }}><p className={Nav.logoTitle}>잎게뭐야</p></a>
            <ul>
                <li className="navItem"><p>잎게뭐야 소개</p></li>
                <li className="navItem">식물 찾기</li>
                <li className="navItem">커뮤니티</li>
                <li className="navItem">식물마켓</li>
            </ul>
            <LoginBtn></LoginBtn>
            </div>
        </div>
        </>
    )

}

export default NavBar;