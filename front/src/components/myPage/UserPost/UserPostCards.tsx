import * as React from "react";
import { useEffect, useState } from "react";
import Show from "../../../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../../communityShow/CardList";
import useUserStore from "../../../store/Login";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../../../api/Api";
import ShowCard from "./UserPostCard";
import CardListStyle from "../../../styles/showOffPage/CardList.module.css";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { TopNavStore } from "@/store/MyPage";

export interface showCard {
  author: string;
  contents: string;
  createdAt: string;
  title: string;
  updatedAt?: string;
  imageUrl: string;
  price: number;
  _id: string;
}

export interface props {
  key: string;
  _id: string;
  imageUrl: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
  page: number;
  contents: string;
  price: number;
  showCards: showCard[];
  setShowCards: React.Dispatch<React.SetStateAction<showCard[]>>;
}

const UserPostCards = () => {
  const user = useUserStore((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const [showCards, setShowCards] = useState<showCard[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = page == totalPage;
  const { pickedTopNav } = TopNavStore();
  const isMarketTap = pickedTopNav.name === "식물마켓";
  console.log(pickedTopNav.apiAddress);

  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `${pickedTopNav.apiAddress}?userId=${user.userId}&page=${page}`
      );
      if (res.data == "게시물 없음") {
        setShowCards([]);
      } else {
        if (isMarketTap) {
          setShowCards(res.data.userMarkets);
        } else {
          setShowCards(res.data.userPosts);
        }
        setTotalPage(res.data.totalPage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(showCards[0].price);
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
      setShowCards([...showCards, ...res.data.userPosts]);
      setPage(page + 1);
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
                return (
                  <ShowCard
                    key={showcard._id}
                    _id={showcard._id}
                    imageUrl={showcard.imageUrl}
                    title={showcard.title}
                    userName={user.name}
                    userImage={user.imageUrl}
                    date={showcard.createdAt}
                    page={page}
                    contents={showcard.contents}
                    showCards={showCards}
                    setShowCards={setShowCards}
                    // {showCard.price && price={showCard.price}}
                    price={showCard.price}
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
export default UserPostCards;
