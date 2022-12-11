import * as React from "react";
import { useEffect, useState } from "react";
import Show from "../../../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../../communityShow/CardList";
import useUserStore from "../../../store/Login";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../../../api/Api";
import UserCommentCard from "./UserCommentCard";
import CardListStyle from "../../../styles/showOffPage/CardList.module.css";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { TopNavStore, pageStore } from "@/store/MyPage";

import styled from "styled-components";
import {
  UserCommentCardContainer,
  UserCommentCardListItem,
  UserCommentCardDiv,
  UserCommentCardContent,
  UserCommentCardPostTitle,
  UserCommentCardDate,
  UserCommentCardImage,
} from "./UserCommentCardUI";

export interface ShowCard {
  author: string;
  contents: string;
  createdAt: string;
  title: string;
  updatedAt?: string;
  imageUrl: string;
  price: number;
  _id: string;
  category: string;
}

export interface Props {
  key: string;
  _id: string;
  imageUrl: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
  contents: string;
  price: number;
  category: string;
  //   isSoldOut: string;
}

const UserCommentCards = () => {
  const user = useUserStore((state) => state.user);
  const { page, increasePage, resetPage } = pageStore();
  const { pickedTopNav } = TopNavStore();
  const [showCards, setShowCards] = useState<ShowCard[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = page == totalPage;
  const isAsksTap = pickedTopNav.name === "질문하기";
  const isPostsTap = pickedTopNav.name === "자랑하기";
  const isMarketTap = pickedTopNav.name === "식물마켓";
  console.log(showCards);
  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `${pickedTopNav.apiAddress}?userId=${user.userId}&page=${page}`
      );

      if (isMarketTap) {
        setShowCards(res.data.userMarkets);
      } else {
        setShowCards(res.data.userPosts);
      }
      isAsksTap && setShowCards(res.data.userAsks);
      isPostsTap && setShowCards(res.data.userPosts);
      isMarketTap && setShowCards(res.data.userMarkets);
      setTotalPage(res.data.totalPage);
    } catch (err: any) {
      if (err.response.status === 404) {
        setShowCards([]);
        console.log("여기");
      }
    }
  };

  useEffect(() => {
    apiGetShowCardData();
  }, [pickedTopNav]);

  const loadMoreCards: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = await Api.get(
        "users",
        `${pickedTopNav.apiAddress}?userId=${user.userId}&page=${page + 1}`
      );
      isAsksTap && setShowCards([...showCards, ...res.data.userAsks]);
      isPostsTap && setShowCards([...showCards, ...res.data.userPosts]);
      isMarketTap && setShowCards([...showCards, ...res.data.userMarkets]);

      increasePage();
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };

  return (
    <>
      <UserCommentCardContainer>
        <UserCommentCardListItem>
          <UserCommentCardDiv>
            <UserCommentCardContent>
              안녕하세요. 만나서 반갑습니다. 혹시 한국말 할줄 아시나요?(코멘트
              내용)
            </UserCommentCardContent>
            <UserCommentCardPostTitle>
              "I am Groot, and we are Groot(게시글 제목)" 에 남긴 댓글
            </UserCommentCardPostTitle>
            <UserCommentCardDate>2022. 12. 25(작성 날짜)</UserCommentCardDate>
          </UserCommentCardDiv>
          <UserCommentCardImage>게시물 이미지</UserCommentCardImage>
        </UserCommentCardListItem>
      </UserCommentCardContainer>
    </>
  );
};
export default UserCommentCards;
