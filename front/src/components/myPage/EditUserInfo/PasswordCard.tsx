import React, { Dispatch, SetStateAction } from "react";
import * as R from "../../../styles/RegisterPage/Register.styled";
import * as M from "../../../styles/MyPage/MyPage.styled";
import { SquareBtn, black } from "../../buttons/BasicBtn";

interface Props {
  setIsEditingPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const PasswordCard = ({ setIsEditingPassword }: Props) => {
  return (
    <>
      <M.PasswordContainer>
        <M.BlankSpace></M.BlankSpace>
        <M.PasswordContentBox>
          <M.PwTag>비밀번호</M.PwTag>
          <SquareBtn
            theme={black}
            type="button"
            onClick={() => setIsEditingPassword(true)}
          >
            수정
          </SquareBtn>
        </M.PasswordContentBox>
      </M.PasswordContainer>
    </>
  );
};

export default PasswordCard;
