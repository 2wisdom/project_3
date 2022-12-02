import React, { useState, Dispatch, SetStateAction } from "react";
import UserInfo from "../components/myPage/UserContainer";
import PasswordEdit from "../components/myPage/PasswordEdit";
import PasswordCard from "../components/myPage/PasswordCard";
import useUserStore from "@/store/Login";
import * as M from "../styles/MyPage/MyPage.styled";
import * as R from "../styles/RegisterPage/Register.styled";
import axios from "axios";
import { RoundBtn, white, violet } from "../styles/buttons/BasicBtn";
import { ContentBox } from "@/styles/RegisterPage/Register.styled";

interface User {
  password: string;
  newPassword: string;
}

export interface IProps {
  newUser: User;
  setNewUser: Dispatch<SetStateAction<User>>;
}

const MyPage = () => {
  // const navList = ["개인정보수정", "작성한글", "작성한 댓글"];
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [newUser, setNewUser] = useState<User>({
    password: "",
    newPassword: "",
  });
  console.log(newUser);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);

  const userUpload: React.FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const temp = JSON.stringify(newUser);
    let formData = new FormData();
    formData.append("body", temp);
    if (file != null) {
      formData.append("file", file);
    }
    console.log(formData);

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
          <UserInfo setFile={setFile} />
          {!isEditingPassword ? (
            <PasswordCard setIsEditingPassword={setIsEditingPassword} />
          ) : (
            <PasswordEdit newUser={newUser} setNewUser={setNewUser} />
          )}
          <ContentBox>
            <RoundBtn theme={white} type="button">
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
