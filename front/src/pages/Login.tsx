import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Api from "../api/Api";
import useUserStore from "../store/Login";
import * as L from "../styles/LoginPage/Login.styled";
import {useNavigate}  from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  // 로그인실패 알려줌
  const [loginFailed, setLoginFailed] = useState(false);
  // console.log(loginData);

  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);
  console.log("currentUser: ", currentUser);
  
  //아이디 비번이 조건에 맞는지 확인.
  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password: string) => {
    return password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,10}$/gm);
  };
  const isEmailValid = validateEmail(loginData.email);
  const isPasswordValid =
  loginData.password.length >= 8 && validatePassword(loginData.password);
  const isFormValid = isEmailValid && isPasswordValid;
  

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (!isFormValid){
        throw console.log('id ')
      }
      const res = await Api.post("users/login", loginData);
      const user = res.data;
      console.log("res.data: ", user)
      //전역유저 상태업데이트
      setUser(user);
      
      const accessToken = user.accessToken;
      const RefreshToken = user.refreshToken;
    
      sessionStorage.setItem("userAcessToken", accessToken);
      sessionStorage.setItem("userAcessToken", RefreshToken);
      // dispatch({
      //   type: "LOGIN_SUCCESS",
      //   payload: user,
      // });

      navigate("/");
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      setLoginFailed(true);
    }
  };

  return (
    <L.MainContent>
      <L.LoginContainer onSubmit={handleSubmit}>
        <L.LoginTitle>로 그 인</L.LoginTitle>
        <L.P>
          식물 관련된 모든 것을 할 수 있는 플랫폼, 잎게뭐야에 오신 것을
          환영합니다.
        </L.P>
        <L.LoginInput
          id="email"
          type="text"
          placeholder="아이디를 입력하세요"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <L.LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <L.LoginFail>
          {loginFailed && (
            <L.NotifyFail>
              이메일 또는 비밀번호를 잘못 입력했습니다.
              <br />
              입력하신 내용을 다시 확인해주세요.
            </L.NotifyFail>
          )}
        </L.LoginFail>

        <L.LoginButton>로 그 인</L.LoginButton>

        <L.P>
          아직 잎게뭐야 계정이 없으신가요?<span>   </span>
          <Link to="/register">회원가입</Link>
        </L.P>
      </L.LoginContainer>
    </L.MainContent>
  );
};
export default Login;
