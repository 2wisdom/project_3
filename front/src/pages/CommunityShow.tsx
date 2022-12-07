import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../components/communityShow/CardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
interface showCard {
  // map: any;
  author: {
    _id: string;
    email: string;
    imageUrl: string;
    name: string;
    password: string;
    updatedAt?: string;
    createdAt?: string;
  };

  _id: string;
  imageUrl: string;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt?: string;
}

const CommuityShow = () => {
  const navigate = useNavigate();
  const [showCardData, setShowCardData] = useState<showCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);
  const key = "posts";
  console.log("key", key);
  const apiGetShowCardData = async () => {
    await Api.get("posts", null)
      .then((res) => {
        setShowCardData(res.data.docs);
        setHasNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      })
      .catch((err) => {
        console.log("posts실패!", err);
      });
  };
  useEffect(() => {
    apiGetShowCardData();
  }, []);

  const moreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    Api.get(`posts?page=${page + 1}&limit=8`, null).then((res) => {
      setShowCardData([...showCardData, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(res.data.page);
    });
  };

  return (
    <div className={Show.container}>
      <div className={Show.Inner}>
        <div className={Show.buttonContainer}>
          <div className={Show.buttonInner}>
            <button className={Show.grayBtn}>질문하기</button>
            <button className={Show.yellowBtn}>자랑하기</button>
          </div>
        </div>
        <div className={Show.rightInner}>
          <div className={Show.titleSearchInner}>
            <h2 className={Show.title}>내가 찍은 사진을 자랑해보세요</h2>
            <Search key={key} setShowCardData={setShowCardData}></Search>
          </div>
          <div className={Show.cardInner}>
            {showCardData && (
              <ShowCardList showCardData={showCardData}></ShowCardList>
            )}
          </div>
          <div className={Show.footer}>
            <div className={Show.moreBtnInner}>
              {showCardData && hasNextPage ? (
                <button className={Show.moreBtn} onClick={moreBtnHandler}>
                  더보기
                </button>
              ) : null}
            </div>
            <div className={Show.writeBtnInner}>
              <EditIcon
                className={Show.writeBtnOutline}
                sx={{ fontSize: 30 }}
                onClick={() => {
                  navigate("/createShowCard");
                }}
              ></EditIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuityShow;
