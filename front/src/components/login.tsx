import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import create from 'zustand'
import * as Api from "../../api/Api";

interface LoginData = {
  id: string;
  password: string;
}

// const userStore = create((set) => ({
//   id: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))


const Login = () => {
  const [userData, setUserData] = useState({ id: "" })
  const [id, setId] = useState("");
  const [password, setpassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (id: string) => {
    return id
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(id);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  // 로그인실패 알려줌
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("!!", {
        id,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      setLoginFailed(true) //로그인 실패 알려주기
    }
  };



  return (
    <MainContent>
      <LoginContainer onSubmit={handleSubmit}>
        <LoginTitle>로 그 인</LoginTitle>
        <P>식물 관련된 모든 것을 할 수 있는 플랫폼, 잎게뭐야에 오신 것을 환영합니다.</P>
        <LoginInput
          id="email"
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <LoginButton>로 그 인</LoginButton>

        <P>
          아직 잎게뭐야 계정이 없으신가요?
          <Link to="/register">회원가입</Link>
        </P>

      </LoginContainer>
    </MainContent>)
}
export default Login;

const MainContent = styled.div`
  width: 70%;
  height: 80%;
  margin: 0 auto;
`
const P = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`
const LoginContainer = styled.form`
  width: 100%;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  text-align: center;
  font-family: 'NanumGothic';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
`;

const LoginTitle = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  margin-bottom: 3%;
  margin-top: 8%;
  text-decoration : underline solid #3278E4;
  text-underline-position: under;
`

const LoginInput = styled.input`
  width: 470px;
  height: 74px;
  display: block;
  background: #EBEBEB;
  border-radius: 12px;
  border: none;
  display: block;
  margin: 0 auto;
  margin-top: 3%;
  margin-bottom: 3%;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  :focus {
    border: 3px solid #3278E4;
  }
`


const LoginButton = styled.button`
  width: 470px;
  height: 92px;
  color: #FFFFFF;
  background: #000000;
  border-radius: 12px;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  margin: 0 auto;
  margin-top: 5%;
  cursor: pointer;
`;

