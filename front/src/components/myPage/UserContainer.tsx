import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { IProps } from "../../pages/myPage";
import useUserStore from "@/store/Login";
import * as M from "../../styles/myPage/MyPage.styled";
import { SquareBtn, red, white, black } from "../../styles/buttons/BasicBtn";

const UserInfo = ({ newUser, setNewUser }: IProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <M.UserContainer>
      <Stack alignItems="center">
        <CardMedia
          component="img"
          height="180"
          image="/static/images/cards/paella.jpg"
          // alt="Paella dish"
          // border-radius="50%"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <SquareBtn theme={white} type="button">
            삭제
          </SquareBtn>
          <FileBtn theme={black} htmlFor="input-file">
            변경
            {/* <input hidden accept="image/*" multiple type="file" /> */}
          </FileBtn>
          <input type="file" id="input-file" style={{ display: "none" }} />
          {/* <Button component="label">
            </Button> */}
        </Stack>
      </Stack>
      {/* <ImgContainer>
            </ImgContainer> */}
      <M.InputContainer>
        <M.ContentBox>
          <M.Tag>닉네임</M.Tag>
          <M.Input
            id="name"
            type="text"
            placeholder={user.name}
            value={newUser.name}
            onChange={(e) =>
              setNewUser((state) => ({ ...state, name: e.target.value }))
            }
          ></M.Input>
        </M.ContentBox>
        <M.ContentBox>
          <M.Tag>이메일</M.Tag>
          <M.Input
            id="email"
            type="text"
            placeholder={user.email}
            value={newUser.email}
            onChange={(e) =>
              setNewUser((state) => ({ ...state, email: e.target.value }))
            }
          ></M.Input>
        </M.ContentBox>
        <SquareBtn theme={red}> 회원탈퇴 </SquareBtn>
      </M.InputContainer>
    </M.UserContainer>
  );
};
export default UserInfo;

const FileBtn = styled.label`
  color: ${(props) => props.theme.fg};
  border: 1px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  width: 8rem;
  font-size: 1.2rem;
  margin: 1em 0;
  height: 3rem;
  line-height: 3rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;
