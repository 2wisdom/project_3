import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import useUserStore from "@/store/Login";
import * as M from "../../styles/MyPage/MyPage.styled";
import axios from "axios";
import { SquareBtn, red, white, black } from "../../styles/buttons/BasicBtn";

interface Props {
  setSaveProfileImg: React.Dispatch<React.SetStateAction<any>>;
  setIsDeleteProfileImg: React.Dispatch<React.SetStateAction<boolean>>;
  previewImg: string;
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>;
}

const UserInfo = ({
  setSaveProfileImg,
  setIsDeleteProfileImg,
  previewImg,
  setPreviewImg,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const defaultImage = "public/images/leavesGetMoreYards.png";

  //프로필 이미지 미리보기
  const changeProfileImgPreview = async (previewFile: any) => {
    let formData = new FormData();
    formData.append("image", previewFile);
    try {
      const res = await axios({
        method: "post",
        //api안나옴
        url: "~~",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      //api수정되면 바꿀부분
      const result = res.data.url;
      setPreviewImg(result);
      console.log("result: ", result);
    } catch (err) {
      console.log("imageErr", err);
      alert("이미지가 조건에 맞지않습니다.");
    }
  };

  return (
    <M.UserContainer>
      <Stack alignItems="center">
        <img
          height="180"
          src={`http://${window.location.hostname}:5000/${previewImg}`}
          alt="profileImg"
          // border-radius="50%"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <SquareBtn
            theme={white}
            type="button"
            onClick={() => {
              setIsDeleteProfileImg(true);
              setSaveProfileImg(null);
              setPreviewImg(defaultImage);
            }}
          >
            삭제
          </SquareBtn>
          <M.FileBtn theme={black} htmlFor="input-file" onClick={() => {}}>
            변경
          </M.FileBtn>
          <input
            type="file"
            id="input-file"
            style={{ display: "none" }}
            onChange={(e) => {
              setSaveProfileImg(e.target.files![0]);
              setIsDeleteProfileImg(false);
              changeProfileImgPreview(e.target.files![0]);
            }}
          />
        </Stack>
      </Stack>
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
