// import "./styles.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <MainContent>
      <RegisterContainer>
        <Title>회원가입</Title>
        <Tag>닉네임</Tag>
        <NicknameInput
          id="email"
          type="text"
          placeholder="아이디를 입력하세요"
          // value={userData.email}
          // onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <NinameConfirmBtn>중복 확인</NinameConfirmBtn>
        <PasswordInput
          id="password"
          type="text"
          placeholder="비밀번호를 입력하세요"
          // value={userData.email}
          // onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        {/* 닉네임
      <input
        placeholder="닉네임을 입력하세요"></input>
      <button>중복확인</button>
      이메일
      <input></input>
      <button>중복확인</button>
      비밀번호
      <input>
      </input>
      비밀번호 확인
      <input>
      </input>
      <button>회원가입</button> */}
        {/* <LoginTitle>회원가입</LoginTitle>
        <LoginInput id="email" type="text" placeholder="아이디를 입력하세요" />
        <LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <LoginButton>회원가입</LoginButton>
      </LoginContainer> */}
      </RegisterContainer>
    </MainContent>
  );
};
export default Register;

const MainContent = styled.div`
  width: 70vw;
  height: 80vh;
  margin: 0 auto;
`;

const RegisterContainer = styled.form`
  width: 70vw;
  height: 80vh;
  display: grid;
  background-color: yellow;
  grid-template-columns: 1fr 650px 1fr;
  // grid-template-rows: repeat(5, 1fr) 2fr;
  grid-template-areas:
    ". title ."
    "tag input confirm"
    "tag input confirm"
    "tag input ."
    "tag input ."
    ". btn .";
  gap: 0.25rem;
  place-items: center;
  font-family: "NanumGothic";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
`;

const Title = styled.div`
  background-color: blue;
  grid-area: title;
  border: 2px solid pink;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  margin-bottom: 3%;
  margin-top: 8%;
  text-decoration: underline solid #3278e4;
  text-underline-position: under;
`;

const Tag = styled.div`
  grid-area: tag;
  font-family: "NanumGothic";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
`;

const NicknameInput = styled.input`
  grid-area: input;
  width: 470px;
  height: 74px;
  grid-area: input
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

const NinameConfirmBtn = styled.button`
  grid-area: confirm;
  width: 85px;
  height: 28px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 28px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #3278e4;
`;
const PasswordInput = styled(NicknameInput)``;

// .item: title {
//   grid-column: 1/4;
//   grid-row: 1/2;
//   background-color: #blue;

// }
// const MainContent = styled.div`
//   width: 70%;
//   height: 80%;
//   margin: 0 auto;
// `;
// const P = styled.div`
//   margin-top: 5%;
//   margin-bottom: 5%;
// `;
// const LoginContainer = styled.form`
//   width: 100%;
//   height: 80%;
//   flex-direction: column;
//   justify-content: center;
//   align-item: center;
//   text-align: center;
//   font-family: "NanumGothic";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 20px;
//   line-height: 20px;
// `;

// const LoginTitle = styled.div`
//   font-weight: 700;
//   font-size: 36px;
//   line-height: 36px;
//   margin-bottom: 3%;
//   margin-top: 8%;
//   text-decoration: underline solid #3278e4;
//   text-underline-position: under;
// `;

// const LoginInput = styled.input`
//   width: 470px;
//   height: 74px;
//   display: block;
//   background: #ebebeb;
//   border-radius: 12px;
//   border: none;
//   display: block;
//   margin: 0 auto;
//   margin-top: 3%;
//   margin-bottom: 3%;
//   text-align: center;
//   font-size: 24px;
//   line-height: 24px;
//   :focus {
//     border: 3px solid #3278e4;
//   }
// `;

// const LoginButton = styled.button`
//   width: 470px;
//   height: 92px;
//   color: #ffffff;
//   background: #000000;
//   border-radius: 12px;
//   font-weight: 700;
//   font-size: 36px;
//   line-height: 36px;
//   margin: 0 auto;
//   margin-top: 5%;
//   cursor: pointer;
// `;

// interface LoginData {
//     email: string;
//     password: string;
//     [key: string]: string;
// }
