import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import UserInfo from "./UserCard";
import PasswordEdit from "./PasswordEdit";
import PasswordCard from "./PasswordCard";
import useUserStore from "@/store/Login";
import axios from "axios";
import { RoundBtn, white, violet } from "../../../styles/buttons/BasicBtn";
import { ContentBox } from "@/styles/RegisterPage/Register.styled";
// import { Api } from "@mui/icons-material";
import * as Api from "../../../api/Api";

interface Password {
  password: string;
  newPassword: string;
}

export interface IProps {
  newPassword: Password;
  setNewPassword: Dispatch<SetStateAction<Password>>;
}

const EditUserInfo = () => {
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
  const [img, setImg] = useState<string>(user.imageUrl);

  const resetPage = () => {
    setImg(user.imageUrl);
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

  const userUpload: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isDeleteProfileImg === true) {
      try {
        await Api.put(`users/defaultimage/${user.userId}`, {});
      } catch (err) {
        alert("프로필사진 삭제 중 오류가 발생하였습니다. 재시도해주세요");
      }
    }
    let formData = new FormData();
    if (newPassword.password !== "" || saveProfileImg != null) {
      if (newPassword.password !== "") {
        formData.append("password", newPassword.password);
        formData.append("newPassword", newPassword.newPassword);
      }
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
          `http://${window.location.hostname}:5000/users/defaultimage${user.userId}`,
          formData,
          config
        );
        if (res.status === 200) {
          console.log("유저 정보 수정 성공");
          setUser(res.data);
        }
      } catch (err: any) {
        if (err.response.data === "비밀번호가 일치하지 않습니다."){
          alert("기존 비밀번호가 일치하지 않습니다. 다시 확인해주세요.")
        }else{
          console.log("유저 수정 에러", err);
        alert("유저정보 수정 중 오류가 발생했습니다. 재시도해주세요. ");
        }
      }
    }
  };

  return (
    <>
      <UserInfo
        saveProfileImg={saveProfileImg}
        setSaveProfileImg={setSaveProfileImg}
        setIsDeleteProfileImg={setIsDeleteProfileImg}
        img={img}
        setImg={setImg}
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
        <RoundBtn theme={violet} type="button" onClick={userUpload}>
          적용
        </RoundBtn>
      </ContentBox>
    </>
  );
};

export default EditUserInfo;
