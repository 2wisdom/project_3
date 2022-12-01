import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { IProps } from "../../pages/myPage";
import useUserStore from "@/store/Login";

const UserInfo = (
  newUser: IProps["newUser"],
  setNewUser: IProps["setNewUser"]
) => {
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <UserContainer>
      <Stack alignItems="center">
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          // alt="Paella dish"
          // border-radius="50%"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="outlined">삭제</Button>
          <Button variant="contained" component="label">
            변경
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Stack>
      </Stack>
      {/* <ImgContainer>
            </ImgContainer> */}
      <InputContainer>
        <ContentBox>
          <Tag>닉네임</Tag>
          <Input
            id="name"
            type="text"
            placeholder={user.name}
            value={newUser.name}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, name: e.targt.value }))
            }
          ></Input>
        </ContentBox>
        <ContentBox>
          <Tag>이메일</Tag>
          <Input placeholder={user.email}></Input>
        </ContentBox>
        <Button> 회원탈퇴 </Button>
      </InputContainer>
    </UserContainer>
  );
};
export default UserInfo;

const MainContent = styled.div`
  display: block;
  width: 130rem;
  height: 90%;
  margin: 0 auto;
  // background-color: grey;
`;

const LoginContainer = styled.form`
  display: flex;
  justify-content: left;
  align-item: left;
  text-align: left;
  font-family: "Nanum Gothic", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.25rem;
  // background-color: blue;
`;

const NavBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 80vh;
  margin: 20rem 3rem 0 0;
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
  // background-color: #eaebfc;
  background-color: #d8d8d8;
  color: black;
  // color: white;
`;

const MainContainer = styled.form`
  margin-top: 5rem;
  flex-direction: column;
  display: flex;
  width: 80%;
  height: 80vh;
  background-color: white;
`;

const Title = styled.div`
  font-family: 'Jua', sans-serif;
  font-weight: 300;
  font-size:3rem;
  padding-bottom:8rem;
  padding-top: 3rem;
}`;

const UserContainer = styled.div`
  display: flex;
  margin-left: 15rem;
  justify-content: left;
  align-item: left;
  flex-direction: row;
  border-bottom: 1px solid;
`;
const ImgContainer = styled.div`
  width: 30rem;
  height: 30rem;
  justify-content: center;
  align-item: center;
  text-align: center;
  background-color: yellow;
  // border-radius: 50%;
`;

const Img = styled.div``;
// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const InputContainer = styled.div`
  margin-left: 7rem;
  // background-color: pink;
  text-align: right;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  height: 7rem;
  justify-content: center;
`;

const Tag = styled.div`
  width: 5rem;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* identical to box height */
  text-align: center;
`;

export const Input = styled.input`
  width: 40rem;
  height: 4.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  display: block;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.5rem;
  &:focus {
    outline: none;
  }
`;

const PasswordContainer = styled(UserContainer)`
  display: flex;
  flex-direction: column;
  height: 20rem;
  border: none;
  margin-top: 3rem;
`;
