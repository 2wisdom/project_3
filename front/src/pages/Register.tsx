// import "./styles.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
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
  console.log("resigterData: ", registerData);
  const [confirmPassword, setConfirmPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  // const [isNameValid, setIsNameValid] = useState(false);
  // 닉네임이 2글자 이상, 8글자 이하인지 여부를 확인함.
  // const [isNameValid,setIsNameValid] = useState("");
  const inputStart = registerData.name.length >= 1;
  const isNameValid =
    registerData.name.length >= 2 && registerData.name.length <= 8;
  const isCofirm = false
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(registerData.email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = registerData.password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = registerData.password === confirmPassword;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isNameValid && isPasswordValid && isPasswordSame && isEmailValid;

  //닉네임 중복 버튼 클릭했는지
  //이메일 중복시 알려줌
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  //닉네임 중복시 알려줌
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  console.log("닉네임중복?", isNameDuplicate);

  const handleConfirm = async () => {
    try {
      const res = await Api.get("주소", registerData.name);
    } 
    
    catch {
      setIsNameDuplicate(true);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            color="red"
          />
          <R.ConfirmBtn
            type="button"
            onClick={handleConfirm}
            disabled={!isNameValid ? true : false}
          >
            중복 확인
          </R.ConfirmBtn>
        </R.ContentBox>
        {inputStart && !isNameValid && (
          <R.NotifyNotValid>
            닉네임을 2글자 이상, 8글자 이하로 설정해주세요.
          </R.NotifyNotValid>
        )}
        {!isNameDuplicate? (
          <R.NotifyValid>
            사용가능한 닉네임입니다.
          </R.NotifyValid>
        ):(
          <R.NotifyNotValid>
            중복된 닉네임입니다.
          </R.NotifyNotValid>
        )}
        <R.ContentBox>
          <R.Tag>이메일</R.Tag>
          <R.Input
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <R.ConfirmBtn>중복 확인</R.ConfirmBtn>
        </R.ContentBox>
        <R.PasswordContentBox>
          <R.Tag>비밀번호</R.Tag>
          <R.Input
            id="password"
            type="text"
            placeholder="비밀번호를 입력하세요"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
        </R.PasswordContentBox>
        <R.PasswordContentBox>
          <R.Tag>비밀번호 확인</R.Tag>
          <R.Input
            id="passwordConfirm"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </R.PasswordContentBox>
        <R.SubmitButton>회원가입</R.SubmitButton>
      </R.RegisterContainer>
    </R.MainContent>
  );
};
export default Register;
