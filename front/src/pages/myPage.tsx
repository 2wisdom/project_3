import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditUserInfo from "../components/myPage/EditUserInfo/EditUserInfo";
import UserPostCards from "../components/myPage/UserPost/UserPostCards";
import useUserStore from "@/store/Login";
import { TopNavStore, NavStore } from "@/store/MyPage";
import * as M from "../styles/MyPage/MyPage.styled";
// import { Api } from "@mui/icons-material";

const MyPage = () => {
  const navigate = useNavigate();

  const navList = [
    { name: "개인정보수정", address: "" },
    { name: "작성한 글", address: "userPost" },
    { name: "작성한 댓글", address: "userComment" },
  ];

  const topNavList = [
    { name: "질문하기", apiAddress: "asks" },
    { name: "자랑하기", apiAddress: "posts" },
    { name: "식물마켓", apiAddress: "markets" },
  ];
  const { setPickedTopNav } = TopNavStore();
  // const { pickedNav, setPickedNav } = NavStore();
  const [pickedNav, setPickedNav] = useState("개인정보수정");
  // const [pickedTopNav, setPickedTopNav] = useState("질문하기");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const para = window.location.pathname.split("/");
  console.log("para: ", para);
  console.log("pickedNav", pickedNav);

  return (
    <M.MainContent>
      <M.TitleContainer>
        <M.Title>마이페이지</M.Title>
        {pickedNav !== "개인정보수정" &&
          topNavList.map((nav) => {
            return (
              <M.topNav
                type="button"
                value={nav.name}
                key={nav.name}
                onClick={(e) => setPickedTopNav(nav)}
                // {pickedNav===this.value && (primary)}
              >
                {nav.name}
              </M.topNav>
            );
          })}
      </M.TitleContainer>
      <M.MyPageContainer>
        <M.NavBox>
          {navList.map((nav) => {
            return (
              <M.NavBtn
                type="button"
                value={nav.name}
                key={nav.name}
                // {pickedNav===this.value && (primary)}
                onClick={(e) => {
                  navigate(nav.address);
                  setPickedNav((e.target as HTMLButtonElement).value);
                }}
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
