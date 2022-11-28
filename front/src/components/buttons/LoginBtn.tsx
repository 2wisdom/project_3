import LoginBtnStyle from "../../styles/buttons/LoginBtnStyle";

const LoginBtn = ({ isLogin }: any) => {
  const btnState = isLogin ? "로그아웃" : "로그인";

  
  return (
    <>
      <LoginBtnStyle className="loginBtn">{btnState}</LoginBtnStyle>
    </>
  );
};

export default LoginBtn;
