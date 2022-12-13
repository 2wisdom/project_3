import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditUserInfo from "../components/myPage/EditUserInfo/EditUserInfo";
import UserPostCards from "../components/myPage/UserPost/UserPostCards";
import UserCommentCards from "../components/myPage/UserComment/UserComments";
import useUserStore from "@/store/Login";
import { TopNavStore, pageStore } from "@/store/MyPage";
import * as M from "../styles/MyPage/MyPage.styled";
// import { Api } from "@mui/icons-material";

const MyPage = () => {
  const navigate = useNavigate();
  const { pickedTopNav, setPickedTopNav } = TopNavStore();
  // const { pickedNav, setPickedNav } = NavStore();
  const { resetPage } = pageStore();
  const [pickedNav, setPickedNav] = useState("개인정보수정");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  const navList = [
    { name: "개인정보수정", address: "" },
    { name: "작성한 글", address: "userPost" },
    { name: "작성한 댓글", address: "userComment" },
  ];

  const topNavList = [
    { name: "질문하기", apiAddress: "asks", commentAPi: "Ask"},
    { name: "자랑하기", apiAddress: "posts", commentAPi: "Post" },
    { name: "식물마켓", apiAddress: "markets", commentAPi: "Market" },
  ];
  const para = window.location.pathname.split("/");
  const isInfoTap = para[2] === undefined;
  console.log(pickedNav);
  return (
    <M.MainContent>
      <M.TitleContainer>
        <M.Title>마이페이지</M.Title>
        {!isInfoTap &&
          topNavList.map((nav) => {
            return (
              <M.topNav
                isPicked={pickedTopNav.name === nav.name}
                type="button"
                name={nav.name}
                value={nav.name}
                key={nav.name}
                onClick={(e) => {
                  setPickedTopNav(nav);
                  resetPage();
                }}
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
                isPicked={pickedNav === nav.name}
                type="button"
                value={nav.name}
                name={nav.name}
                key={nav.name}
                onClick={(e) => {
                  navigate(nav.address);
                  setPickedNav((e.target as HTMLButtonElement).value);
                  setPickedTopNav({ name: "질문하기", apiAddress: "asks", commentAPi: "Ask"});
                  resetPage();
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
            <Route path="userComment/" element={<UserCommentCards />} />
          </Routes>
        </M.MainContainer>
      </M.MyPageContainer>
    </M.MainContent>
  );
};
export default MyPage;
