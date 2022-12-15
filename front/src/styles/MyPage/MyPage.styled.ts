import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContent = styled.div`
  // display: block;
  width: 140rem;
  height: 90%;
  margin: 0 auto;
  // background-color: grey;
`;

export const MyPageContainer = styled.form`
  display: flex;
  justify-content: left;
  align-items: left;
  text-align: left;
  font-family: "Nanum Gothic", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.25rem;
  // background-color: blue;
`;

export const NavBox = styled.div`
  display: flex;
  flex-direction: column;
  // width: 10rem;
  height: 80vh;
  margin: 5rem 0 0 0;
`;

export const NavBtn = styled.button<{ isPicked: boolean }>`
  width: 15rem;
  height: 5rem;
  font-weight: 800;
  font-size: 2rem;
  border: none;
  border-radius: 1rem;
  background-color: #ffda7b;
  margin-right: 4rem;
  margin-top: 2rem;
  margin-left: 1rem;
  cursor: pointer;
  // background-color: #eaebfc;
  background-color: ${(props) => (props.isPicked ? "#EAEBFC" : "#D8D8D8")};
  color: ${(props) => (props.isPicked ? "black" : "white")};
`;

//  ${(props) =>
//     props.primary &&
//     css`
//       color: black;
//       background: #eaebfc;
//     `}

export const MainContainer = styled.form`
  flex-direction: column;
  display: flex;
  width: 80%;
  height: 80vh;
`;

export const TitleContainer = styled.div`
  flex-direction: row;
  display: flex;
  font-family: "Jua", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  margin: 8rem 0 5rem 22rem;
`;

export const Title = styled.div`
  margin-right: 5rem;
`;

export const topNav = styled.button<{ isPicked: boolean }>`
  font: NanumGothic;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2rem 3rem 0 0;
  border: none;
  color: ${(props) => (props.isPicked ? "#6F77FD" : "#919191")};
  text-decoration: ${(props) => props.isPicked && "underline solid #6F77FD"};
  text-underline-offset: ${(props) => props.isPicked && "0.5rem"};
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #6f77fd;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  margin-left: 15rem;
  justify-content: left;
  align-items: left;
  flex-direction: row;
  border-bottom: 1px solid grey;
`;

export const ImgContainer = styled.div`
  width: 30rem;
  height: 30rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: yellow;
  // border-radius: 50%;
`;

export const Img = styled.div``;
// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

export const InputContainer = styled.div`
  margin-left: 7rem;
  // background-color: pink;
  text-align: right;
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 1rem;
  align-items: center;
  height: 7rem;
  justify-content: center;
`;

export const Tag = styled.div`
  width: 7rem;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* identical to box height */
  text-align: center;
`;

export const PwTag = styled(Tag)`
  margin-right: 33rem;
`;

export const Input = styled.input`
  width: 40rem;
  height: 4.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  display: block;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.5rem;
  &:focus {
    outline: none;
  }
`;

export const TagValue = styled.div`
  width: 40rem;
  height: 4.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  display: block;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.5rem;
  &:focus {
    outline: none;
  }
  line-height: 4.5rem;
`;
//
export const PasswordContainer = styled(UserContainer)`
  display: flex;
  flex-direction: row;
  text-align: center;
  height: 25rem;
  border: none;
  margin-top: 3rem;
`;

export const PasswordContainer2 = styled(UserContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 25rem;
  border: none;
  margin-top: 3rem;
`;

export const PasswordContentBox = styled(ContentBox)``;

export const FileBtn = styled.label`
  color: ${(props) => props.theme.fg};
  border: 1px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  width: 8rem;
  font-size: 1.2rem;
  margin: 1em 0;
  height: 3rem;
  line-height: 3rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  border-radius: 20px;
`;

export const UserImage = styled.img`
  border-radius: 20px;
  max-width: 18rem;
  background-size: cover;
`;

export const BlankSpace = styled.div`
  display: block;
  padding-left: 25rem;
  height: 8rem;
`;
