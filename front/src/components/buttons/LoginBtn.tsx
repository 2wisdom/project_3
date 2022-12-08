import LoginBtnStyle from "../../styles/buttons/LoginBtnStyle";

interface LoginProps {
  isLogin: boolean;
}

const LoginBtn: React.FunctionComponent<LoginProps> = ({ isLogin }) => {
  const btnState = isLogin ? "로그아웃" : "로그인";

  return (
    <>
      <LoginBtnStyle className="loginBtn">{btnState}</LoginBtnStyle>
    </>
  );
};

export default LoginBtn;
