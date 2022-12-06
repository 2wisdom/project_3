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

  const [showCards, setShowCards] = useState<showCard[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = page >= totalPage;
  // console.log("user", user);
  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `posts?userId=${user.userId}&page=${page}`
      );
      if (res.data !== []) {
        setShowCards(res.data.userPosts);
        setTotalPage(res.data.totalPage);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        `posts?userId=${user.userId}&page=${page + 1}`
      );
      setShowCards([...showCards, ...res.data.userPosts]);
      setPage(page + 1);
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };
  console.log(showCards);
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
                      _id={showcard._id}
                      image={showcard.imageUrl}
                      title={showcard.title}
                      userName={user.name}
                      userImage={user.imageUrl}
                      date={showcard.createdAt}
                    />
                  );
                })}
              </div>
              <div className={Show.footer}>
                <div className={Show.moreBtnInner}>
                  {!isLastPage && (
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
    </div>
  );
};
export default UserPostCards;
