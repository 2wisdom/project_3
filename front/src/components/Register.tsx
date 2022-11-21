import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <MainContent>
      <LoginContainer>
        <LoginTitle>회원가입</LoginTitle>
        <LoginInput id="email" type="text" placeholder="아이디를 입력하세요" />
        <LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <LoginButton>회원가입</LoginButton>
      </LoginContainer>
    </MainContent>
  );
};
export default Register;

const MainContent = styled.div`
  width: 70%;
  height: 80%;
  margin: 0 auto;
`;
const P = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`;
const LoginContainer = styled.form`
  width: 100%;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  text-align: center;
  font-family: "NanumGothic";
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
  text-decoration: underline solid #3278e4;
  text-underline-position: under;
`;

const LoginInput = styled.input`
  width: 470px;
  height: 74px;
  display: block;
  background: #ebebeb;
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
    border: 3px solid #3278e4;
  }
`;

const LoginButton = styled.button`
  width: 470px;
  height: 92px;
  color: #ffffff;
  background: #000000;
  border-radius: 12px;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  margin: 0 auto;
  margin-top: 5%;
  cursor: pointer;
`;

// interface LoginData {
//     email: string;
//     password: string;
//     [key: string]: string;
// }
