import { useState, useEffect } from "react";
import Cmt from "../../styles/Comment.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "@/store/Login";
import NestedComment from "./NestedComment";
import * as Api from "../../api/Api";
import CommentInput from "./CommentInput";
import { SquareBtn, black, white } from "../buttons/BasicBtn";

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
  postType: string;
}

const Comment = ({
  postAuthorName,
  content,
  createdAt,
  isSecret,
  writer,
  writingId,
  comment_id,
  postType,
}: props) => {
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5);
  const { user } = useUserStore();
  const isPostAuthor = user.name === postAuthorName;
  const CanSeeComment = !isSecret || isPostAuthor || writer.name === user.name;
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [nestedCommentList, setNestedCommentList] = useState<comment[]>([]);
  const [isShowNestedComment, setIsShowNestedComment] =
    useState<boolean>(false);
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

  const deleteComment = async() => {
    if (confirm("댓글을 정말 삭제하시겠습니까?")){
      try{
        const res = Api.delete("comments", comment_id)
        alert("댓글이 삭제되었습니다.") 
    }catch(err){
      alert("댓글 삭제도중 오류가 발생했습니다. 다시 시도해주세요.")
    }
    }
  }

  return (
    <div className={Cmt.CommentBox}>
      <div className={Cmt.Inner}>
        <div className={Cmt.Cmt}>
          <div>
          {CanSeeComment ? content : "비밀댓글입니다."}
          </div>
          <div className={Cmt.CmtBtn}>
            <SquareBtn theme={white} type="button" onClick={deleteComment}> 삭제 </SquareBtn>
            <SquareBtn theme={black} type="button" > 수정 </SquareBtn>
          </div>
        </div>
        
        <div className={Cmt.userInner}>
          {CanSeeComment && (
            <Avatar
              className={Cmt.Avatar}
              alt="user profile image"
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
        <div>
          <button
            className={Cmt.toggleBtn}
            onClick={() => setIsShowNestedComment(!isShowNestedComment)}
          >
            {isShowNestedComment? "▽" : "▷"} 답글 {nestedCommentList.length}개
          </button>
        </div>
        {isShowNestedComment &&
          nestedCommentList.map((nestedComment) => {
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
            postType={postType}
          />
        )}
      </div>
    </div>
  );
};
export default Comment;
