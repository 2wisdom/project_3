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

export interface showCard {
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

export interface props {
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
  const [showCards, setShowCards] = useState<showCard[]>([]);
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
      isAsksTap && setShowCards([...showCards, ...res.data.userAsks])
      isPostsTap && setShowCards([...showCards, ...res.data.userPosts])
      isMarketTap && setShowCards([...showCards, ...res.data.userMarkets])
        
      increasePage();
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };

  return (
    <div className={Show.container}>
      <div className={Show.Inner}>
        <div className={Show.cardInner}>
          <div className={CardListStyle.cardList}>
            <div className={CardListStyle.cardListInner}>
              {showCards &&
                showCards.map((showcard) => {
                  return (
                    <UserCommentCard
                      key={showcard._id}
                      _id={showcard._id}
                      imageUrl={showcard.imageUrl}
                      title={showcard.title}
                      userName={user.name}
                      userImage={user.imageUrl}
                      date={showcard.createdAt}
                      contents={showcard.contents}
                      price={showcard.price}
                      category= {showcard.category}
                    />
                  );
                })}
            </div>
            <div className={Show.footer}>
              <div className={Show.moreBtnInner}>
                {!isLastPage && showCards.length != 0 && (
                  <button className={Show.moreBtn} onClick={loadMoreCards}>
                    더보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCommentCards;
