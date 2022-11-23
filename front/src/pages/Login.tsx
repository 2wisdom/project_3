import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../api/Api";
import useUserStore from "../store/Login";
import * as L from "../styles/LoginPage/Login.styled";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });
  console.log(userData);
  const setUser = useUserStore((state) => state.setUser);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (id: string) => {
    return id
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  // const isEmailValid = validateEmail(userData.email);
  // // 비밀번호가 4글자 이상인지 여부를 확인함.
  // const isPasswordValid = userData.password.length >= 4;
  // //
  // // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  // const isFormValid = isEmailValid && isPasswordValid;

  // 로그인실패 알려줌
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("!!", userData);
      // 유저 정보는 response의 data임.
      const user = res.data;
      // const user={"email": "spspsp@naver.com", "password":"sspspsp", "token":"Dfdfdf"};
      // user상태 업데이트
      setUser(user);

      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
    
      // // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      // sessionStorage.setItem("userToken", jwtToken);
      // // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      // dispatch({
      //   type: "LOGIN_SUCCESS",
      //   payload: user,
      // });

      // // 기본 페이지로 이동함.
      // navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      setLoginFailed(true); //로그인 실패 알려주기
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
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <L.LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <L.LoginFail>
          {loginFailed && (
            <p>
              이메일 또는 비밀번호를 잘못 입력했습니다.
              <br />
              입력하신 내용을 다시 확인해주세요.
            </p>
          )}
        </L.LoginFail>

        <L.LoginButton>로 그 인</L.LoginButton>

        <L.P>
          아직 잎게뭐야 계정이 없으신가요?
          <Link to="/register">회원가입</Link>
        </L.P>
      </L.LoginContainer>
    </L.MainContent>
  );
};
export default Login;
