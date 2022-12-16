import React, { useState, useEffect } from "react";
import * as Api from "../api/Api";
import { validateEmail, validatePassword } from "../components/Validate";
import useUserStore from "../store/Login";
import * as L from "../styles/LoginPage/Login.styled";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  // 로그인실패 알려줌
  const [loginFailed, setLoginFailed] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const isEmailValid = validateEmail(loginData.email);
  const isPasswordValid = validatePassword(loginData.password);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (!isFormValid) {
        throw console.log("validate error");
      }
      const res = await Api.post("users/login", loginData);
      if (res.status === 201) {
        const user = res.data;
        console.log("res.data: ", user);
        setUser(user);
        const accessToken = user.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      }
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      setLoginFailed(true);
    }
  };

  return (
    <L.MainContent>
      <L.LoginContainer onSubmit={handleSubmit}>
        <L.LoginTitle>로 그 인</L.LoginTitle>
        <L.P>
          식물 관련된 모든 것을 할 수 있는 플랫폼, 잎게뭐야에 오신 것을
          환영합니다.
        </L.P>
        <L.LoginInput
          id="email"
          type="text"
          placeholder="아이디를 입력하세요"
          value={loginData.email}
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <L.LoginInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={loginData.password}
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        {loginFailed && (
          <L.LoginFail>
            이메일 또는 비밀번호를 잘못 입력했습니다.
            <br />
            입력하신 내용을 다시 확인해주세요.
          </L.LoginFail>
        )}

        <L.LoginButton>로 그 인</L.LoginButton>

        <L.P>
          아직 잎게뭐야 계정이 없으신가요?
          <L.StyledLink to="/register">회원가입</L.StyledLink>
        </L.P>
      </L.LoginContainer>
    </L.MainContent>
  );
};
export default Login;
