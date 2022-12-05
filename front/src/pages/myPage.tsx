import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import UserInfo from "../components/myPage/UserContainer";
import PasswordEdit from "../components/myPage/PasswordEdit";
import PasswordCard from "../components/myPage/PasswordCard";
import useUserStore from "@/store/Login";
import * as M from "../styles/MyPage/MyPage.styled";
import * as R from "../styles/RegisterPage/Register.styled";
import axios from "axios";
import { RoundBtn, white, violet } from "../styles/buttons/BasicBtn";
import { ContentBox } from "@/styles/RegisterPage/Register.styled";

interface Password {
  password: string;
  newPassword: string;
}

export interface IProps {
  newPassword: Password;
  setNewPassword: Dispatch<SetStateAction<Password>>;
}

const MyPage = () => {
  // const navList = ["개인정보수정", "작성한글", "작성한 댓글"];
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [newPassword, setNewPassword] = useState<Password>({
    password: "",
    newPassword: "",
  });

  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isDeleteProfileImg, setIsDeleteProfileImg] = useState<boolean>(false);
  const [saveProfileImg, setSaveProfileImg] = useState<any>(null);
  //이걸로는 프사 초기화 안됨.
  const [previewImg, setPreviewImg] = useState<string>(user.imageUrl);

  const resetPage = () => {
    setPreviewImg(user.imageUrl);
    setIsEditingPassword(false);
    setIsDeleteProfileImg(false);
    setSaveProfileImg(null);
    setNewPassword({
      password: "",
      newPassword: "",
    });
  };
  //처음 유저이미지 불러오기 + 저장했을 때 myPage초기화
  useEffect(() => {
    resetPage();
  }, [user]);

  const userUpload: React.FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (isDeleteProfileImg === true) {
      try {
        ///프로필 삭제 api로 요청보내기
      } catch {}
    }

    let formData = new FormData();
    const temp = JSON.stringify(newPassword);
    formData.append("body", temp);
    if (saveProfileImg != null) {
      formData.append("image", saveProfileImg);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    //수정된 이미지, password api요청보내기
    try {
      const res = await axios.put(
        `http://${window.location.hostname}:5000/users/${user.userId}`,
        formData,
        config
      );
      if (res.status === 200) {
        console.log("유저 정보 수정 성공");
        setUser(res.data);
      }
    } catch (err: any) {
      console.log("유저 수정 에러", "err");
      alert("파일을 저장하는데 실패했습니다.");
    }
  };

  return (
    <M.MainContent>
      <M.Title>마이페이지</M.Title>
      <M.MyPageContainer>
        <M.NavBox>
          <M.NavBtn>개인정보수정</M.NavBtn>
        </M.NavBox>
        <M.MainContainer>
          <UserInfo
            setSaveProfileImg={setSaveProfileImg}
            setIsDeleteProfileImg={setIsDeleteProfileImg}
            previewImg={previewImg}
            setPreviewImg={setPreviewImg}
          />
          {!isEditingPassword ? (
            <PasswordCard setIsEditingPassword={setIsEditingPassword} />
          ) : (
            <PasswordEdit
              newPassword={newPassword}
              setNewPassword={setNewPassword}
            />
          )}
          <ContentBox>
            <RoundBtn theme={white} type="button" onClick={() => resetPage()}>
              취소
            </RoundBtn>
            <RoundBtn
              theme={violet}
              type="button"
              onClick={(e) => userUpload(e)}
            >
              적용
            </RoundBtn>
          </ContentBox>
        </M.MainContainer>
      </M.MyPageContainer>
    </M.MainContent>
  );
};
export default MyPage;
