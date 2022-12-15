import * as React from "react";
import { useEffect, useState } from "react";
import Show from "../../../styles/showOffPage/ShowPage.module.css";
import useUserStore from "../../../store/Login";
import * as Api from "../../../api/Api";
import UserPostCard from "./UserPostCard";
import UserMarketCard from "./UserMarketCard";
import CardListStyle from "../../../styles/showOffPage/CardList.module.css";
import { TopNavStore, pageStore } from "@/store/MyPage";
import ShowCard from "../../market/MarketCard";

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
  isSoldOut: boolean;
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
  showCards: ShowCard[];
  setShowCards: React.Dispatch<React.SetStateAction<ShowCard[]>>;
  isSoldOut: boolean;
}

const UserPostCards = () => {
  const user = useUserStore((state) => state.user);
  const { page, increasePage, resetPage } = pageStore();
  const { pickedTopNav } = TopNavStore();
  const [showCards, setShowCards] = useState<ShowCard[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = page === totalPage;
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
      isAsksTap && setShowCards(res.data.userAsks);
      isPostsTap && setShowCards(res.data.userPosts);
      isMarketTap && setShowCards(res.data.userMarkets);
      setTotalPage(res.data.totalPage);
    } catch (err: any) {
      if (err.response.status === 404) {
        setShowCards([]);
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
      console.log("res", res);
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
              {showCards.map((showcard) => {
                return !isMarketTap ? (
                  <UserPostCard
                    key={showcard._id}
                    _id={showcard._id}
                    imageUrl={showcard.imageUrl}
                    title={showcard.title}
                    userName={user.name}
                    userImage={user.imageUrl}
                    date={showcard.createdAt}
                    contents={showcard.contents}
                    showCards={showCards}
                    setShowCards={setShowCards}
                  />
                ) : (
                  <UserMarketCard
                    key={showcard._id}
                    _id={showcard._id}
                    imageUrl={showcard.imageUrl}
                    title={showcard.title}
                    userName={user.name}
                    userImage={user.imageUrl}
                    date={showcard.createdAt}
                    contents={showcard.contents}
                    showCards={showCards}
                    setShowCards={setShowCards}
                    price={showcard.price}
                    category={showcard.category}
                    isSoldOut={showcard.isSoldOut}
                  />
                );
              })}
            </div>
            <div className={Show.footer}>
              <div className={Show.moreBtnInner}>
                {!isLastPage && showCards.length !== 0 && (
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
export default UserPostCards;
