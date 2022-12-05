import React, { Dispatch, SetStateAction } from "react";
import * as R from "../../styles/RegisterPage/Register.styled";
import * as M from "../../styles/MyPage/MyPage.styled";
import { SquareBtn, black } from "../../styles/buttons/BasicBtn";

interface Props {
  setIsEditingPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const PasswordCard = ({ setIsEditingPassword }: Props) => {
  return (
    <M.PasswordContainer>
      <R.PasswordContentBox>
        <M.PwTag>비밀번호</M.PwTag>
        <SquareBtn
          theme={black}
          type="button"
          onClick={() => setIsEditingPassword(true)}
        >
          수정
        </SquareBtn>
      </R.PasswordContentBox>
    </M.PasswordContainer>
  );
};

export default PasswordCard;
