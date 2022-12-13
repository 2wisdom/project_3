import styled from "styled-components";

//theme
export const red = {
  fg: "white",
  bg: "red",
};

export const white = {
  fg: "black",
  bg: "white",
};

export const black = {
  fg: "white",
  bg: "black",
};

export const violet = {
  fg: "white",
  bg: "#6F77FD",
};


export const SquareBtn = styled.button`
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.fg};
  width: 8rem;
  font-size: 1.2rem;
  margin: 1rem 0;
  padding: 0.25em 1em;
  height: 3rem;
  font-weight: bold;
  cursor: pointer;
`;

export const RoundBtn = styled.button`
  color: ${(props) => props.theme.fg};
  border: 1px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  width: 6rem;
  font-size: 1.2rem;
  margin: 1em 1rem;
  padding: 0.25em 1em;
  height: 3rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
`;

// ${(props)=>{
//   return css`
//   color: {props.color};
//   background: ${(props) => props.background};
//   `}}
