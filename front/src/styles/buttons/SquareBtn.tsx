import styled from "styled-components";

const red = {
  fg: "white",
  bg: "red",
};

const white = {
  fg: "black",
  bg: "white",
};

const black = {
  fg: "white",
  bg: "black",
};

const SquareBtn = styled.button`
  color: ${(props) => props.theme.fg};
  border: 1px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  width: 8rem;
  font-size: 1.2rem;
  margin: 1em 0;
  padding: 0.25em 1em;
  height: 3rem;
  font-weight: bold;
  cursor: pointer;
`;

export default SquareBtn;
// ${(props)=>{
//   return css`
//   color: {props.color};
//   background: ${(props) => props.background};
//   `}}
