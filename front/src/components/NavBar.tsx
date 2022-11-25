import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginBtn from './buttons/LoginBtn';
import Nav from "../styles/Nav.module.css"
const NavBar = () => {
    const navigate = useNavigate();
    return(
        <>
        <div className={Nav.nav}>
            <div className={Nav.navContainer}>
                <a className={Nav.logo} onClick={() => {
                    navigate("/");
                }}><p className={Nav.logoTitle}>잎게뭐야</p></a>
            
                <ul className={Nav.navItemInner}>
                    <li className={Nav.navItem}>잎게뭐야 소개</li>
                    <li className={Nav.navItem}>식물 찾기</li>
                    <li className={Nav.navItem}>커뮤니티</li>
                    <li className={Nav.navItem}>식물마켓</li>
                </ul>
                <div className={Nav.loginBtn} onClick={()=>{
                    navigate("/login")
                }}>
                    <LoginBtn></LoginBtn>
                </div>
            </div>
        </div>
        </>
    )

}

export default NavBar;