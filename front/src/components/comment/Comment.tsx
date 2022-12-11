import { useState, useEffect } from "react";
import Cmt from "../../styles/Comment.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "@/store/Login";
import NestedComment from "./NestedComment";
import * as Api from "../../api/Api";
import CommentInput from "./CommentInput";

interface writer {
  name: string;
  _id: string;
  imageUrl: string;
}

interface comment {
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: writer;
  writingId: string;
  _id: string;
}

interface props {
  postAuthorName: string;
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: writer;
  writingId: string;
  comment_id: string;
}

const Comment = ({
  postAuthorName,
  content,
  createdAt,
  isSecret,
  writer,
  writingId,
  comment_id,
}: props) => {
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5);
  const { user } = useUserStore();
  const isPostAuthor = user.name === postAuthorName;
  const CanSeeComment = !isSecret || isPostAuthor || writer.name === user.name;
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [nestedCommentList, setNestedCommentList] = useState<comment[]>([]);

  //처음 대댓글 불러오기
  useEffect(() => {
    if (comment_id) {
      Api.get(`comments/${comment_id}`)
        .then((res) => {
          setNestedCommentList(res.data.comments);
          console.log(`res.data-comments`, res);
        })
        .catch((err) => {
          console.log("err-comments", err);
        });
    }
  }, []);

  return (
    <div className={Cmt.CommentBox}>
      <div className={Cmt.Inner}>
        <div>{CanSeeComment ? content : "비밀댓글입니다."}</div>
        <div className={Cmt.userInner}>
          {CanSeeComment && (
            <Avatar
              className={Cmt.Avatar}
              alt="Remy Sharp"
              src={`http://${window.location.hostname}:5000/${writer.imageUrl}`}
              sx={{ width: 24, height: 24 }}
            />
          )}
          {CanSeeComment ? (
            <h5 className={Cmt.userName}>
              {writer.name} | {date[0]} {time}
            </h5>
          ) : (
            <h5>
              {date[0]} {time}
            </h5>
          )}
          <button
            className={Cmt.btn}
            onClick={() => setOpenCommentBox(!openCommentBox)}
          >
            답글등록
          </button>
        </div>
        {nestedCommentList.map((nestedComment) => {
          return (
            <NestedComment
              key={nestedComment._id}
              isPostAuthor={isPostAuthor}
              content={nestedComment.content}
              createdAt={nestedComment.createdAt}
              isSecret={nestedComment.isSecret}
              writer={nestedComment.writer}
              parentComment_id={comment_id}
              post_id={nestedComment._id}
            />
          );
        })}
        {openCommentBox && (
          <CommentInput
            comment_id={comment_id}
            setNestedCommentList={setNestedCommentList}
            setOpenCommentBox={setOpenCommentBox}
          />
        )}
      </div>
    </div>
  );
};
export default Comment;
