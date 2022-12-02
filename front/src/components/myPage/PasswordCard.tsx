import React, { Dispatch, SetStateAction } from "react";
import * as R from "../../styles/RegisterPage/Register.styled";
import * as M from "../../styles/myPage/MyPage.styled";
import { SquareBtn, black } from "../../styles/buttons/BasicBtn";

const PasswordCard = ({
  isEditingPassword,
}: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (
    <M.PasswordContainer>
      <R.PasswordContentBox>
        <M.PwTag>비밀번호</M.PwTag>
        <SquareBtn
          theme={black}
          type="button"
          onClick={() => isEditingPassword(true)}
        >
          수정
        </SquareBtn>
      </R.PasswordContentBox>
    </M.PasswordContainer>
  );
};

export default PasswordCard;
