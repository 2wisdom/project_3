import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UserInfo from "../components/myPage/UserContainer";
import Password from "../components/myPage/PasswordContents";
import useUserStore from "@/store/Login";
import * as M from "../styles/myPage/MyPage.styled";
import SquareBtn from "../styles/buttons/SquareBtn";

interface User {
  email: string;
  name: string;
  profileImg?: string;
  password?: string;
  newPassword?: string;
}

export interface IProps {
  newUser: User;
  setNewUser: Dispatch<SetStateAction<User>>;
}

const MyPage = () => {
  // const navList = ["개인정보수정", "작성한글", "작성한 댓글"];
  const user = useUserStore((state) => state.user);
  const [newUser, setNewUser] = useState<IProps["newUser"]>({
    email: user.email,
    name: user.name,
    profileImg: user.profileImg,
    password: "",
    newPassword: "",
  });

  return (
    <M.MainContent>
      <M.MyPageContainer>
        <M.NavBox>
          <M.NavBtn>개인정보수정</M.NavBtn>
        </M.NavBox>
        <M.MainContainer>
          <M.Title>마이페이지</M.Title>
          <UserInfo newUser={newUser} setNewUser={setNewUser} />
          <Password newUser={newUser} setNewUser={setNewUser} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined">취소</Button>
            <Button variant="outlined">적용</Button>
          </Stack>
        </M.MainContainer>
      </M.MyPageContainer>
    </M.MainContent>
  );
};
export default MyPage;
