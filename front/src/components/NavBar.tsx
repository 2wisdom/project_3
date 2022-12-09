import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBtn from "./buttons/LoginBtn";
import Nav from "../styles/Nav.module.css";
import useUserStore from "../store/Login";
import * as Api from "../api/Api";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isLogin = user.email != "";
  const logout: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.delete("token", null);
      if (res.status === 200) {
        alert("로그아웃 되었습니다.");
        localStorage.clear();
        setUser({
          email: "",
          name: "",
          userId: "",
          imageUrl: "",
          accessToken: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log("로그아웃에 실패하였습니다.", err);
    }
  };

  return (
    <>
      <div className={Nav.nav}>
        <div className={Nav.navContainer}>
          <a
            className={Nav.logo}
            onClick={() => {
              navigate("/");
            }}
          >
            <p className={Nav.logoTitle}>잎게뭐야</p>
          </a>

          <ul className={Nav.navItemInner}>
            <li
              className={Nav.navItem}
              onClick={() => {
                navigate("/");
              }}
            >
              잎게뭐야 소개
            </li>
            <li
              className={Nav.navItem}
              onClick={() => {
                navigate("/findPlant");
              }}
            >
              식물 찾기
            </li>
            <li
              className={Nav.navItem}
              onClick={() => {
                navigate("/communityAsk");
              }}
            >
              커뮤니티
            </li>
            <li className={Nav.navItem}
            onClick={() => {
              navigate("/market");
            }}>식물마켓</li>
          </ul>
          <div
            className={Nav.loginBtn}
            onClick={isLogin ? logout : () => navigate("/login")}
          >
            <LoginBtn isLogin={isLogin}></LoginBtn>
          </div>
          {isLogin && (
            <div className={Nav.userIconBox}>
              <FaUserCircle
                size="3.5rem"
                color="#3278E4"
                onClick={() => navigate("/myPage")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
