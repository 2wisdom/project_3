import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import useUserStore from "@/store/Login";
import * as M from "../../../styles/MyPage/MyPage.styled";
import {
  SquareBtn,
  red,
  white,
  black,
  SquareBtn2,
} from "../../buttons/BasicBtn";
import { useNavigate } from "react-router-dom";
import * as Api from "../../../api/Api";

interface Props {
  saveProfileImg: React.Dispatch<any>;
  setSaveProfileImg: React.Dispatch<React.SetStateAction<any>>;
  img: string;
  setImg: React.Dispatch<React.SetStateAction<string>>;
  revertToDefaultImage: () => Promise<void>
}

const UserCard = ({
  saveProfileImg,
  setSaveProfileImg,
  img,
  setImg,
  revertToDefaultImage
}: Props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const defaultImage = "public/images/leavesGetMoreYards.png";
  const [previewURL, setPreviewURL] = useState<string>("");
  const megabyte = 5242880

  // 프로필 이미지 미리보기
  const changeProfileImgPreview = async (previewFile: any) => {
    if (previewFile.lastModifiedDate.size > megabyte) {
      alert("5mb 이하 이미지만 프로필 사진으로 설정 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setPreviewURL(reader.result as string);
      }
    };
    reader.readAsDataURL(previewFile);
  };

  const signOut = async () => {
    if (confirm("잎게뭐야를 정말 탈퇴하시겠습니까?")) {
      try {
        const res = await Api.delete("users", `${user.userId}`);
        alert("정상적으로 회원탈퇴 처리되었습니다.");
        localStorage.clear();
      } catch (err) {
        console.log("회원탈퇴에러", err);
        alert("회원탈퇴중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <M.UserContainer>
      <Stack alignItems="center">
        <M.UserImage
          height="180"
          //이미지상태만들기
          src={
            saveProfileImg === null
              ? `http://${window.location.hostname}:5000/${img}`
              : previewURL
          }
          alt="profileImg"
          border-radius="50%"
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <SquareBtn
            theme={white}
            type="button"
            onClick={() => {
              // setIsDeleteProfileImg(true);
              setSaveProfileImg(null);
              setImg(defaultImage);
              setPreviewURL("");
              revertToDefaultImage()
            }}
          >
            삭제
          </SquareBtn>
          <M.FileBtn theme={black} htmlFor="input-file">
            변경
          </M.FileBtn>
          <input
            type="file"
            id="input-file"
            style={{ display: "none" }}
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => {
              setSaveProfileImg(e.target.files![0]);
              // setIsDeleteProfileImg(false);
              changeProfileImgPreview(e.target.files![0]);
              alert("적용을 누르면 변경사항이 저장됩니다.")
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
        <SquareBtn2 type="button" theme={red} onClick={signOut}>
          회원탈퇴
        </SquareBtn2>
      </M.InputContainer>
    </M.UserContainer>
  );
};
export default UserCard;
