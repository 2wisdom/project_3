import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MyPage = () => {
  // const navList = ["개인정보수정", "작성한글", "작성한 댓글"];

  return (
    <MainContent>
      <LoginContainer>
        <NavBox>
          <NavBtn>개인정보수정</NavBtn>
        </NavBox>
      </LoginContainer>
    </MainContent>
  );
};
export default MyPage;

const MainContent = styled.div`
  display: block;
  width: 90rem;
  height: 90%;
  margin: 0 auto;
  background-color: grey;
`;

const LoginContainer = styled.form`
  display: flex;
  justify-content: center;
  align-item: center;
  text-align: center;
  font-family: 'Nanum Gothic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.25rem;
  background-color: blue;
`;

const NavBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 80vh;
`;

const NavBtn = styled.button`
  width: 200px;
  height: 50px;
  font-weight: 800;
  font-size: 25px;
  border: none;
  border-radius: 1rem;
  color: #000000;
  background-color: #ffda7b;
  margin-right: 4rem;
  margin-top: 2rem;
  margin-left: 1rem;
  width: 20rem;
  height: 5.5rem;
  background-color: #eaebfc;
  // background-color: #D8D8D8;
  color: black;
  // color: white;
`;
