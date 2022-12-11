import styled from "styled-components";

export const UserCommentCardContainer = styled.div`
  display: block;
  width: 100%;
  border: 1px solid white;
  background-color: green;
`;

export const UserCommentCardListItem = styled.div`
  position: relative;
  margin: 0 1.5rem;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

export const UserCommentCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

export const UserCommentCardContent = styled.div`
  display: block;
  font-size: 2rem;
  line-height: 1.5rem;
`;
export const UserCommentCardPostTitle = styled.div`
  display: block;
  font-size: 1.5rem;
  line-height: 1.25rem;
  margin-top: 1.5rem;
`;

export const UserCommentCardDate = styled.div`
  display: block;
  margin-top: 1rem;
`;

export const UserCommentCardImage = styled.div`
  height: 72px;
  width: 128px;
  background-color: white;
`;
