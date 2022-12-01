import * as R from "../../styles/RegisterPage/Register.styled";
import styled from "styled-components";

const Password = () => {
  return (
    <PasswordContainer>
      <R.PasswordContentBox>
        <R.Tag>비밀번호</R.Tag>
        <R.Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          // value={registerData.password}
          // onChange={(e) =>
          //   setRegisterData({ ...registerData, password: e.target.value })
          // }
        />
      </R.PasswordContentBox>
      {/* {isInputStart(registerData.password) && !isPasswordValid && (
        <R.NotifyNotValid>
          비밀번호는 8~20자, 영문+숫자를 조합해주세요.
        </R.NotifyNotValid>
      )} */}
      <R.PasswordContentBox>
        <R.Tag>새로운 비밀번호</R.Tag>
        <R.Input
          id="newPassword"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          // value={confirmPassword}
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </R.PasswordContentBox>
    </PasswordContainer>
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
  height: 20rem;
  border: none;
  margin-top: 3rem;
`;
