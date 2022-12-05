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
import axios from "axios";

export interface showCard {
  author: string;
  contents: string;
  createdAt: string;
  title: string;
  updatedAt?: string;
  imageUrl: string;
  _id: string;
}

const UserPostCards = () => {
  const user = useUserStore((state) => state.user);
  const [page, setPage] = useState<number>(1);
  //   const showCardData = showCardStore.showCardStore(
  //     (state: any) => state.showCards
  //   );
  //   const apiGetShowCardData = showCardStore.showCardStore(
  //     (state: any) => state.apiGetShowCards
  //   );
  const [showCards, setShowCards] = useState<showCard[]>([]);

  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `posts?userId=${user.userId}&page=${page}`
      );
      setShowCards(res.data);
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("data: ", showCards);

  useEffect(() => {
    apiGetShowCardData();
  }, [user.userId]);

  const loadMoreCards: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = await Api.get(
        "users",
        `posts?userId=${user.userId}&page=${page}`
      );
      setShowCards([...showCards, ...res.data]);
      setPage(page + 1);
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };
  console.log(page);
  return (
    <div className={Show.container}>
      <div className={Show.Inner}>
        <div className={Show.buttonContainer}></div>
        <div className={Show.rightInner}>
          <div className={Show.cardInner}>
            <div className={CardListStyle.cardList}>
              <div className={CardListStyle.cardListInner}>
                {showCards.map((showcard) => {
                  return (
                    <ShowCard
                      key={showcard._id}
                      image={showcard.imageUrl}
                      title={showcard.title}
                      userImage={showcard.imageUrl}
                      userName={user.name}
                      date={showcard.createdAt}
                    />
                  );
                })}
              </div>
              <div className={Show.footer}>
                <div className={Show.moreBtnInner}>
                  <button className={Show.moreBtn} onClick={loadMoreCards}>
                    {" "}
                    더보기{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPostCards;
