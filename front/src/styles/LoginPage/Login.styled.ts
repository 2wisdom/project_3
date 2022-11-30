import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContent = styled.div`
  width: 90rem;
  height: 80%;
  margin: 0 auto;
`;

export const LoginContainer = styled.form`
  flex-direction: column;
  justify-content: center;
  align-item: center;
  text-align: center;
  font-family: "NanumGothic";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.25rem;
`;

export const P = styled.div`
font-size: 1.5rem;
  margin-top: 5%;
  margin-bottom: 5%;
`;


export const LoginTitle = styled.div`
  font-weight: 700;
  font-size: 3rem;
  line-height: 2rem;
  margin-bottom: 3rem;
  margin-top: 8%;
  text-decoration: underline solid #3278e4;
  text-underline-position: under;
`;

export const LoginInput = styled.input`
  width: 30rem;
  height: 4.5rem;
  display: block;
  background: #ebebeb;
  border-radius: 0.8rem;
  border: none;
  display: block;
  margin: 0 auto;
  margin-top: 3%;
  margin-bottom: 3%;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5rem;
  :focus {
    border: 0.15rem solid #3278e4;
  }
`;

export const LoginButton = styled.button`
  width: 30rem;
  height: 5.5rem;
  color: #ffffff;
  background: #000000;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  margin: 0 auto;
  margin-top: 5%;
  cursor: pointer;
`;

export const LoginFail = styled.div`
  color: red;
  font-size: 1.1rem;
  margin: 0 auto;
  height: 2rem;
`

export const StyledLink = styled(Link)`
  margin-left: 1rem;
  color: #3278e4;
  text-decoration: none;
`