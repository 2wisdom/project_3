import * as React from "react";
import { useEffect, useState } from "react";
import Show from "../../../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../../communityShow/CardList";
import useUserStore from "../../../store/Login";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../../../api/Api";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { TopNavStore, pageStore } from "@/store/MyPage";
import Comment from "./UserComment";
import Cmt from "../../../styles/Comment.module.css";

export interface Commnet {
  _id: string;
  content: string;
  createdAt: string;
  writingId: string;
}

export interface Props {
  _id: string;
  content: string;
  createdAt: string;
  writingId: string;
}

const UserCommentCards = () => {
  const user = useUserStore((state) => state.user);
  const { page, increasePage, resetPage } = pageStore();
  const { pickedTopNav } = TopNavStore();
  const [comments, setComments] = useState<Commnet[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = page ===totalPage;
  const isAsksTap = pickedTopNav.name === "질문하기";
  const isPostsTap = pickedTopNav.name === "자랑하기";
  const isMarketTap = pickedTopNav.name === "식물마켓";

  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `comments?userId=${user.userId}&page=${page}&type=${pickedTopNav.commentAPi}`
      );

      // isAsksTap && setComments(res.data.userAsks);
      // isPostsTap && setComments(res.data.userPosts);
      isMarketTap && setComments(res.data.userMarkets);
      setTotalPage(res.data.totalPage);
    } catch (err: any) {
      if (err.response.status === 404) {
        setComments([]);
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
      // isAsksTap && setComments([...comments, ...res.data.userAsks]);
      // isPostsTap && setComments([...comments, ...res.data.userPosts]);
      isMarketTap && setComments([...comments, ...res.data.userMarkets]);

      increasePage();
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };

  return (
    <div className={Cmt.container}>
      <div className={Cmt.commentsContainer}>
        {comments.map((comment) => {
          return (
            <Comment
              _id={comment._id}
              content={comment.content}
              createdAt={comment.createdAt}
              writingId={comment.writingId}
            />
          );
        })}
      </div>
      {!isLastPage && comments.length !== 0 && (
        <button className={Show.moreBtn} onClick={loadMoreCards}>
          더보기
        </button>
      )}
    </div>
  );
};

export default UserCommentCards;
