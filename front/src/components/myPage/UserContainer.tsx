import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { IProps } from "../../pages/myPage";
import useUserStore from "@/store/Login";
import * as M from "../../styles/MyPage/MyPage.styled";
import { SquareBtn, red, white, black } from "../../styles/buttons/BasicBtn";
// : React.Dispatch<React.SetStateAction<any>>;

const UserInfo = ({ setFile }: any) => {
  const user = useUserStore((state) => state.user);
  const [isFileEditing, setIsFileEditing] = useState<boolean>(false);
  //  const [newImg, setNewImg] = useState<object>({});
  const [img, setImage] = useState<string>("");
  // useEffect()
  // isFileEditing? (img) : (userImg)
  return (
    <M.UserContainer>
      <Stack alignItems="center">
        <img
          height="180"
          src={`http://${window.location.hostname}:5000/public/images/${user.imageUrl}`}
          alt="profileImg"
          // border-radius="50%"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <SquareBtn theme={white} type="button">
            삭제
          </SquareBtn>
          <M.FileBtn theme={black} htmlFor="input-file">
            변경
          </M.FileBtn>
          <input
            type="file"
            id="input-file"
            style={{ display: "none" }}
            onChange={(e) =>
              setFile(e.target.files![0], setIsFileEditing(true))
            }
          />
        </Stack>
      </Stack>
      {/* <ImgContainer>
            </ImgContainer> */}
      <M.InputContainer>
        <M.ContentBox>
          <M.Tag>닉네임</M.Tag>
          <M.TagValue>{user.name}</M.TagValue>
        </M.ContentBox>
        <M.ContentBox>
          <M.Tag>이메일</M.Tag>
          <M.TagValue>{user.email}</M.TagValue>
        </M.ContentBox>
        <SquareBtn theme={red}> 회원탈퇴 </SquareBtn>
      </M.InputContainer>
    </M.UserContainer>
  );
};
export default UserInfo;
