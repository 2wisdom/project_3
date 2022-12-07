import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import AskCardList from "../components/communityAsk/AskCardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
interface askCard {
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
const CommunityAsk = () => {
  const navigate = useNavigate();
  const [askCardData, setAskCardData] = useState<askCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const key = "asks";
  const apiGetShowCardData = async () => {
    await Api.get("asks", null)
      .then((res) => {
        setAskCardData(res.data.docs);
        setHasNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      })
      .catch((err) => {
        console.log("asks실패!", err);
      });
  };
  useEffect(() => {
    apiGetShowCardData();
  }, []);
  console.log("askCardData", askCardData);
  const moreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    Api.get(`asks?page=${page + 1}&limit=8`, null).then((res) => {
      setAskCardData([...askCardData, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(res.data.page);
    });
  };
  return (
    <div className={Show.container}>
      <div className={Show.Inner}>
        <div className={Show.buttonContainer}>
          <div className={Show.buttonInner}>
            <button className={Show.yellowBtn}>질문하기</button>
            <button
              className={Show.grayBtn}
              onClick={() => {
                navigate("/communityShowOff");
              }}
            >
              자랑하기
            </button>
          </div>
        </div>
        <div className={Show.rightInner}>
          <div className={Show.titleSearchInner}>
            <h2 className={Show.title}>궁금한 내용들을 물어보세요</h2>
            {/* <Search key={key} setAskCardData={setAskCardData}></Search> */}
          </div>
          <div className={Show.cardInner}>
            {askCardData && (
              <AskCardList askCardData={askCardData}></AskCardList>
            )}
          </div>
          <div className={Show.footer}>
            <div className={Show.moreBtnInner}>
              {askCardData && hasNextPage ? (
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
                  navigate("/createAskCard");
                }}
              ></EditIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAsk;
