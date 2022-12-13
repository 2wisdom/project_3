import { useEffect, useState } from "react";
import { Navigate, useNavigation } from "react-router-dom";
import Show from "../../../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../../communityShow/CardList";
import useUserStore from "../../../store/Login";
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
  const isLastPage = page === totalPage;

  const apiGetShowCardData = async () => {
    try {
      const res = await Api.get(
        "users",
        `comments?userId=${user.userId}&page=${page}&type=${pickedTopNav.commentAPi}`
      );
      setComments(res.data.userComments);
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

  const loadMoreComments: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = await Api.get(
        "users",
        `comments?userId=${user.userId}&page=${page+1}&type=${pickedTopNav.commentAPi}`
      );
      setComments([...comments, ...res.data.userComments]);
      increasePage();
    } catch (err) {
      alert("더보기 에러가 발생했습니다. 다시 시도해주세요")
      console.log("더보기 에러: ", err);
    }
  };

  return (
    <div className={Cmt.myPageContainer}>
      <div className={Cmt.myPageCommentContainer}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              _id={comment._id}
              content={comment.content}
              createdAt={comment.createdAt}
              writingId={comment.writingId}
            />
          );
        })}
      </div>
      <div className={Cmt.buttonContainer}>
        {!isLastPage && comments.length !== 0 && (
          <button className={Show.moreBtn} onClick={loadMoreComments}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCommentCards;
