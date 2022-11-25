import styled from "styled-components";

export const Container=styled.div`
    display:flex;
    padding-top:2rem;
`;

export const Input = styled.input `
    width:20rem;
    height:3rem;
    border: 2px solid rgb(117 117 117);
    border-radius:1rem;
    padding-left:1rem;
    ::placeholder,
    ::-webkit-input-placeholder {
        padding-left:1rem;
        color: #0C884F;
        font-weight:700;
    }
    &:focus {
        outline: 0;
        transition: border-color 0.3s ease-in-out;
        border-color: #0C884F;
        ::placeholder,
        ::-webkit-input-placeholder {
        padding-left:1rem;
        color:rgb(117 117 117);
        font-weight:700;
    }
      }
`;

export const Iconlocation = styled.div`
      margin-left:0.5rem;
`;
  