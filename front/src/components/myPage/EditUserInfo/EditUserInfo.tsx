import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import UserInfo from "./UserCard";
import PasswordEdit from "./PasswordEdit";
import PasswordCard from "./PasswordCard";
import useUserStore from "@/store/Login";
import { RoundBtn, white, violet } from "../../buttons/BasicBtn";
import { CompleteBox } from "@/styles/RegisterPage/Register.styled";
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
  const [saveProfileImg, setSaveProfileImg] = useState<any>(null);
  //이걸로는 프사 초기화 안됨.
  const [img, setImg] = useState<string>(user.imageUrl);

  const resetPage = () => {
    setImg(user.imageUrl);
    setIsEditingPassword(false);
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

  const revertToDefaultImage = async () => {
    if (confirm("기본이미지로 변경하시겠습니까?")) {
      try {
        const res = await Api.put(`users/defaultimage/${user.userId}`, {});
        if (res.status === 200) {
          setUser(res.data);
          alert("기본이미지로 변경되었습니다.");
        }
      } catch (err: any) {
        console.log(err);
        if (err.respone.data === "이미 기본 이미지입니다") {
          alert("이미 기본 이미지입니다");
        } else {
          alert("프로필사진 삭제 중 오류가 발생하였습니다. 재시도해주세요");
        }
      }
    }
  };

  const userUpload: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("password", newPassword.password);
    formData.append("newPassword", newPassword.newPassword);
    //사진변경을 한다면 변경된 데이터 넣기
    if (saveProfileImg !== null) {
      formData.append("image", saveProfileImg);
    }
    //수정된 이미지, password api요청보내기
    try {
      const res = await Api.put(`users/${user.userId}`, formData, true);
      if (res.status === 200) {
        console.log("유저 정보 수정 성공");
        alert("변경사항이 성공적으로 저장되었습니다.");
        setUser(res.data);
      }
    } catch (err: any) {
      if (err.response.data === "비밀번호가 일치하지 않습니다.") {
        alert("기존 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      } else {
        console.log("유저 수정 에러", err);
        alert("유저정보 수정 중 오류가 발생했습니다. 재시도해주세요. ");
      }
    }
    // }
  };

  return (
    <>
      <UserInfo
        saveProfileImg={saveProfileImg}
        setSaveProfileImg={setSaveProfileImg}
        img={img}
        setImg={setImg}
        revertToDefaultImage={revertToDefaultImage}
      />
      {!isEditingPassword ? (
        <PasswordCard setIsEditingPassword={setIsEditingPassword} />
      ) : (
        <PasswordEdit
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        />
      )}
      <CompleteBox>
        <RoundBtn theme={white} type="button" onClick={() => resetPage()}>
          취소
        </RoundBtn>
        <RoundBtn theme={violet} type="submit" onClick={userUpload}>
          적용
        </RoundBtn>
      </CompleteBox>
    </>
  );
};

export default EditUserInfo;
