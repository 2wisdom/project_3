import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginBtn from './buttons/LoginBtn';
import Nav from "../styles/Nav.module.css"
const NavBar = () => {
    const navigate = useNavigate();
    return(
        <>
        <div className="nav">
            <div className='navContainer'>
            <a className='logo' onClick={() => {
                navigate("/");
            }}><p className="logoTitle">잎게뭐야</p></a>
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