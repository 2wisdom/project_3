import styled from "styled-components";

export const MainContent = styled.div`
  width: 90rem;
  height: 80%;
  margin: 0 auto;
`;

export const RegisterContainer = styled.form`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumGothic";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.25rem;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 3rem;
  line-height: 2rem;
  margin-bottom: 8rem;
  margin-top: 8%;
  text-decoration: underline solid #3278e4;
  text-underline-position: under;
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  height: 7rem;
  justify-content: center;
  width: 15rem;
  padding: 0 10rem 0 15rem;
`;

export const PasswordContentBox = styled(ContentBox)`
  padding-right: 12.5rem;
`;

export const Tag = styled.div`
  left: 423px;
  width: 12rem;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* identical to box height */

  text-align: center;
`;

export const Input = styled.input`
  width: 40rem;
  height: 4.5rem;
  display: block;
  background: #ebebeb;
  border-radius: 0.8rem;
  border: none;
  display: block;
  margin: 10rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5rem;
  :focus {
    border: 0.15rem solid #3278e4;
  }
`;

export const ConfirmBtn = styled.button`
  width: 12rem;
  height: 4.5rem;
  color: #3278e4;
  position: relative;
  font-size: 1.3em;
  font-weight: bold;
  background-color: #ffffff;
  decoration: none;
  border: 2px solid #3278e4;
  border-radius: 8px;
  outline: 0;
  cursor: ${(props) => !props.disabled && "pointer"};
  opacity: ${(props) => props.disabled && "0.6"};
`;

export const SubmitButton = styled.button`
  width: 40rem;
  height: 5.5rem;
  color: #ffffff;
  background: #000000;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  margin: 0 auto;
  margin-top: 5%;
  cursor: ${(props) => !props.disabled && "pointer"};
  opacity: ${(props) => props.disabled && "0.6"};
`;

export const NotifyNotValid = styled.div`
  color: red;
  font-size: 1rem;
  height: 2rem;
`;

export const NotifyValid = styled(NotifyNotValid)`
  color: green;
`;

//   ${(props) =>
//         props.primary && //primary 가 존재할 경우
//         css`
//         border: red solid 0.15rem;
//         `}
