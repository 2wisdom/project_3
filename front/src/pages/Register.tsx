// import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useMatch, useNavigate } from "react-router-dom";
import * as Api from "../api/Api";
import * as R from "../styles/RegisterPage/Register.styled";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  // console.log("resigterData: ", registerData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //비밀번호가 8자 이상, 숫자+문자 형태인지 regex를 이용해 확인함.
  const ValidatePassword = (password: string) => {
    return password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,10}$/gm);
  };

  // 입력 시작했는지 체크
  const inputStart = (target: string) => {
    return target.length >= 1;
  };

  // 닉네임이 2~8자인지 확인함.
  const isNameValid =
    registerData.name.length >= 2 && registerData.name.length <= 8;
  // 위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(registerData.email);
  // 비밀번호가 최소 8자, 하나 이상의 문자와 하나의 숫자 여부를 확인함.
  const isPasswordValid =
    registerData.password.length >= 8 &&
    ValidatePassword(registerData.password);
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = registerData.password === confirmPassword;

  //이메일 중복 체크
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [clickEmailConfirm, setClickEmailConfirm] = useState(false);

  //닉네임 중복 체크
  const [isNameDuplicate, setIsNameDuplicate] = useState(true);
  const [clickNameConfirm, setClickNameConfirm] = useState<boolean>(false);

  // // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isNameValid && isPasswordValid && isPasswordSame && isEmailValid;

  const [isFormSubmit, setIsFormSubmit] = useState(false);
  // 나중에 변경하기..? // 위에 조건 모두 동시에 만족되는지?
  // const isFormValid =
  //   isPasswordValid && isPasswordSame && !isEmailDuplicate && !isNameDuplicate;

  const handleNameConfirm = async (value: string) => {
    try {
      const res = await Api.get(`users/name`, value);
      if (res.status === 200) {
        setIsNameDuplicate(false);
      }
    } catch (err: any) {
      console.log(err);
      if (err.status === 409) {
        setIsNameDuplicate(true);
      }
    }
    setClickNameConfirm(true);
  };

  const handleEmailConfirm = async (email: string) => {
    try {
      const res = await Api.get(`users/email`, email);
      if (res.status === 200) {
        setIsEmailDuplicate(false);
      }
    } catch (err: any) {
      console.log(err);
      if (err.status === 409) {
        setIsEmailDuplicate(true);
      }
    }
    setClickEmailConfirm(true);
  };
  console.log(isEmailDuplicate)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsFormSubmit(true);

    if (!isNameDuplicate && !isEmailDuplicate) {
      try {
        const res = await Api.post("users", registerData);

        alert("회원가입에 성공하셨습니다.");
        navigate("/login")
      } catch (err) {
        console.log("회원가입에 실패하였습니다.", err);
      }
    }
  };

  return (
    <R.MainContent onSubmit={handleSubmit}>
      <R.RegisterContainer>
        <R.Title>회 원 가 입</R.Title>
        <R.ContentBox>
          <R.Tag>닉네임</R.Tag>
          <R.Input
            id="name"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={registerData.name}
            onChange={
              (e) => setRegisterData({ ...registerData, name: e.target.value })
              // setClickNameConfirm(false)
            }
          />
          <R.ConfirmBtn
            type="button"
            onClick={() => handleNameConfirm(registerData.name)}
            disabled={!isNameValid ? true : false}
            // border={!isNameValid ? {#3278e4} : {}}
          >
            중복 확인
          </R.ConfirmBtn>
        </R.ContentBox>
        {inputStart(registerData.name) && !isNameValid && (
          <R.NotifyNotValid>
            닉네임을 2글자 이상, 8글자 이하로 설정해주세요.
          </R.NotifyNotValid>
        )}
        {clickNameConfirm ? (
          !isNameDuplicate ? (
            <R.NotifyValid>사용가능한 닉네임입니다.</R.NotifyValid>
          ) : (
            <R.NotifyNotValid>중복된 닉네임입니다.</R.NotifyNotValid>
          )
        ) : (
          isFormSubmit && (
            <R.NotifyNotValid>닉네임 중복확인을 해주세요.</R.NotifyNotValid>
          )
        )}
        <R.ContentBox>
          <R.Tag>이메일</R.Tag>
          <R.Input
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            value={registerData.email}
            onChange={
              (e) => setRegisterData({ ...registerData, email: e.target.value })
              // setClickRegisterConfirm(false)
            }
          />
          <R.ConfirmBtn
            type="button"
            onClick={() => handleEmailConfirm(registerData.email)}
            disabled={!isEmailValid ? true : false}
          >
            중복 확인
          </R.ConfirmBtn>
        </R.ContentBox>
        {inputStart(registerData.email) && !isEmailValid && (
          <R.NotifyNotValid>email형식이 아닙니다</R.NotifyNotValid>
        )}
        {clickEmailConfirm ? (
          !isEmailDuplicate ? (
            <R.NotifyValid>사용가능한 이메일입니다.</R.NotifyValid>
          ) : (
            <R.NotifyNotValid>이미 가입된 이메일입니다.</R.NotifyNotValid>
          )
        ) : (
          isFormSubmit && (
            <R.NotifyNotValid>이메일 중복확인을 해주세요.</R.NotifyNotValid>
          )
        )}

        <R.PasswordContentBox>
          <R.Tag>비밀번호</R.Tag>
          <R.Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
        </R.PasswordContentBox>
        {inputStart(registerData.password) && !isPasswordValid && (
          <R.NotifyNotValid>
            비밀번호는 8~20자, 영문+숫자를 조합해주세요.
          </R.NotifyNotValid>
        )}
        <R.PasswordContentBox>
          <R.Tag>비밀번호 확인</R.Tag>
          <R.Input
            id="passwordConfirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </R.PasswordContentBox>
        {inputStart(confirmPassword) && !isPasswordSame && (
          <R.NotifyNotValid>비밀번호가 일치하지 않습니다.</R.NotifyNotValid>
        )}
        <R.SubmitButton disabled={!isFormValid}>회원가입</R.SubmitButton>
      </R.RegisterContainer>
    </R.MainContent>
  );
};
export default Register;
