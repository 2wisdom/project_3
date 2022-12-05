import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditUserInfo from "../components/myPage/EditUserInfo/EditUserInfo";
import UserPostCards from "../components/myPage/UserPost/UserPostCards";
import useUserStore from "@/store/Login";
import * as M from "../styles/MyPage/MyPage.styled";
// import { Api } from "@mui/icons-material";

const MyPage = () => {
  const navigate = useNavigate();

  const navList = [
    { name: "개인정보수정", address: "" },
    { name: "작성한 글", address: "userPost" },
    { name: "작성한 댓글", address: "userComment" },
  ];

  const [pickedNav, setPickedNav] = useState("개인정보수정");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <M.MainContent>
      <M.Title>마이페이지</M.Title>
      <M.MyPageContainer>
        <M.NavBox>
          {navList.map((nav) => {
            return (
              <M.NavBtn
                type="button"
                value={nav.name}
                key={nav.name}
                // {pickedNav===this.value && (primary)}
                onClick={(e) => {navigate(nav.address)}}
              >
                {nav.name}
              </M.NavBtn>
            );
          })}
        </M.NavBox>
        <M.MainContainer>
          <Routes>
            <Route path="" element={<EditUserInfo />} />
            <Route path="userPost" element={<UserPostCards />} />
            {/* <Route path="userComment/" element={UserComment} /> */}
          </Routes>
        </M.MainContainer>
      </M.MyPageContainer>
    </M.MainContent>
  );
};
export default MyPage;
