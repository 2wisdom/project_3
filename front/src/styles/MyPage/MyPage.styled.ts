import styled from "styled-components";

export const MainContent = styled.div`
  display: block;
  width: 130rem;
  height: 90%;
  margin: 0 auto;
  // background-color: grey;
`;

export const MyPageContainer = styled.form`
  display: flex;
  justify-content: left;
  align-item: left;
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
  width: 15%;
  height: 80vh;
  margin: 20rem 3rem 0 0;
`;

export const NavBtn = styled.button`
  width: 200px;
  height: 50px;
  font-weight: 800;
  font-size: 25px;
  border: none;
  border-radius: 1rem;
  color: #000000;
  background-color: #ffda7b;
  margin-right: 4rem;
  margin-top: 2rem;
  margin-left: 1rem;
  width: 20rem;
  height: 5.5rem;
  // background-color: #eaebfc;
  background-color: #d8d8d8;
  color: black;
  // color: white;
`;

export const MainContainer = styled.form`
  margin-top: 5rem;
  flex-direction: column;
  display: flex;
  width: 80%;
  height: 80vh;
  background-color: white;
`;

export const Title = styled.div`
  font-family: 'Jua', sans-serif;
  font-weight: 300;
  font-size:3rem;
  padding-bottom:8rem;
  padding-top: 3rem;
}`;

export const UserContainer = styled.div`
  display: flex;
  margin-left: 15rem;
  justify-content: left;
  align-item: left;
  flex-direction: row;
  border-bottom: 1px solid;
`;

export const ImgContainer = styled.div`
  width: 30rem;
  height: 30rem;
  justify-content: center;
  align-item: center;
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
  padding: 0.25rem;
  align-items: center;
  height: 7rem;
  justify-content: center;
`;

export const Tag = styled.div`
  width: 5rem;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* identical to box height */
  text-align: center;
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


//
export const PasswordContainer = styled(UserContainer)`
display: flex;
flex-direction: column;
text-align: center;
height: 30rem;
border: none;
margin-top: 3rem;
`;