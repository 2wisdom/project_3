import React from "react";
import NotFoundError from "./assets/error/404.png";
import styled from "styled-components";
const Error = styled.img`
  width: 100%;
  height: 900px;
`;
const NotFound = () => {
  return (
    <div>
      <Error src={NotFoundError} />
    </div>
  );
};

export default NotFound;
