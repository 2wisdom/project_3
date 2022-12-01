import React, { useState } from "react";
import * as R from "../../styles/RegisterPage/Register.styled";
import styled from "styled-components";
import { IProps } from "../../pages/myPage";
import { validatePassword, isInputStart } from "../Validate";
import * as M from "../../styles/myPage/MyPage.styled";

const Password = ({ newUser, setNewUser }: IProps) => {
  // 비밀번호 최소 8자, 문자+숫자 확인.
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordValid = validatePassword(newUser.newPassword!);
  const isPasswordSame = newUser.newPassword === confirmPassword;

  return (
    <M.PasswordContainer>
      <R.PasswordContentBox>
        <R.Tag>기존 비밀번호</R.Tag>
        <R.Input
          id="password"
          type="password"
          placeholder="기존 비밀번호를 입력하세요"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </R.PasswordContentBox>
      <R.PasswordContentBox>
        <R.Tag>새로운 비밀번호</R.Tag>
        <R.Input
          id="newPassword"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          value={newUser.newPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, newPassword: e.target.value })
          }
        />
      </R.PasswordContentBox>

      <R.PasswordContentBox>
        <R.Tag>비밀번호 확인</R.Tag>
        <R.Input
          id="passwordConfirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </R.PasswordContentBox>
      {isInputStart(newUser.newPassword!) && !isPasswordValid && (
        <R.NotifyNotValid>
          비밀번호는 8~20자, 영문+숫자를 조합해주세요.
        </R.NotifyNotValid>
      )}
      {isInputStart(confirmPassword) && !isPasswordSame && (
        <R.NotifyNotValid>비밀번호가 일치하지 않습니다.</R.NotifyNotValid>
      )}
    </M.PasswordContainer>
  );
};

export default Password;

const UserContainer = styled.div`
  display: flex;
  margin-left: 15rem;
  justify-content: left;
  align-item: left;
  flex-direction: row;
  border-bottom: 1px solid;
`;

const PasswordContainer = styled(UserContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 30rem;
  border: none;
  margin-top: 3rem;
`;
