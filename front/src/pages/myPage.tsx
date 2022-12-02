import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UserInfo from "../components/myPage/UserContainer";
import PasswordEdit from "../components/myPage/PasswordEdit";
import PasswordCard from "../components/myPage/PasswordCard";
import useUserStore from "@/store/Login";
import * as M from "../styles/myPage/MyPage.styled";
import * as R from "../styles/RegisterPage/Register.styled";
import {
  RoundBtn,
  SquareBtn,
  white,
  violet,
  black,
} from "../styles/buttons/BasicBtn";
import { ContentBox } from "@/styles/RegisterPage/Register.styled";

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

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <M.MainContent>
      <M.Title>마이페이지</M.Title>
      <M.MyPageContainer>
        <M.NavBox>
          <M.NavBtn>개인정보수정</M.NavBtn>
        </M.NavBox>
        <M.MainContainer>
          <UserInfo newUser={newUser} setNewUser={setNewUser} />
          {!isEditingPassword ? (<PasswordCard setIsEditingPassword={setIsEditingPassword}/>) :(
            <PasswordEdit newUser={newUser} setNewUser={setNewUser} />
          )}
          <ContentBox>
            <RoundBtn theme={white}>취소</RoundBtn>
            <RoundBtn theme={violet}>적용</RoundBtn>
          </ContentBox>
        </M.MainContainer>
      </M.MyPageContainer>
    </M.MainContent>
  );
};
export default MyPage;
