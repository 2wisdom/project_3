import React, { useState, Dispatch, SetStateAction } from "react";
import * as R from "../../../styles/RegisterPage/Register.styled";
import { IProps } from "./EditUserInfo";
import { validatePassword, isInputStart } from "../../Validate";
import * as M from "../../../styles/MyPage/MyPage.styled";

const PasswordEdit = ({ newPassword, setNewPassword }: IProps) => {
  // 비밀번호 최소 8자, 문자+숫자 확인.
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordValid = validatePassword(newPassword.newPassword!);
  const isPasswordSame = newPassword.newPassword === confirmPassword;

  return (
    <M.PasswordContainer2>
      <R.PasswordContentBox>
        <R.Tag>기존 비밀번호</R.Tag>
        <R.Input
          id="password"
          type="password"
          placeholder="기존 비밀번호를 입력하세요"
          value={newPassword.password}
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
        />
      </R.PasswordContentBox>
      <R.PasswordContentBox>
        <R.Tag>새로운 비밀번호</R.Tag>
        <R.Input
          id="newPassword"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          value={newPassword.newPassword}
          onChange={(e) =>
            setNewPassword({ ...newPassword, newPassword: e.target.value })
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
      {isInputStart(newPassword.newPassword!) && !isPasswordValid && (
        <R.NotifyNotValid>
          비밀번호는 8~20자, 영문+숫자를 조합해주세요.
        </R.NotifyNotValid>
      )}
      {isInputStart(confirmPassword) && !isPasswordSame && (
        <R.NotifyNotValid>비밀번호가 일치하지 않습니다.</R.NotifyNotValid>
      )}
    </M.PasswordContainer2>
  );
};

export default PasswordEdit;
