import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cmt from "../../styles/Comment.module.css";
import Comment from "./Comment";
import * as Api from "../../api/Api";
import useUserStore from "@/store/Login";

interface Writer {
  name: string;
  _id: string;
  imageUrl: string;
}

interface comment {
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: Writer;
  writingId: string;
  _id: string;
}

interface Props {
  authorName: string;
  id?: string;
  postType: string;
}

const Comments = ({ authorName, id, postType }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [commentList, setCommentList] = useState<comment[]>([]);
  const isLogin = user.email !== "";

  //처음 댓글 불러오기
  useEffect(() => {
    if (id) {
      Api.get(`comments/${id}`)
        .then((res) => {
          setCommentList(res.data.comments.reverse());
          console.log(`res.data-comments`, res);
        })
        .catch((err) => {
          console.log("err-comments", err);
        });
    }
  }, []);

  //inputArea 비우기
  const resetInputBox = () => {
    setIsSecret(false);
    setContent("");
  };

  //댓글 작성
  const commentPost = async () => {
    if (content === "") {
      alert("댓글을 입력해주세요");
    } else {
      try {
        const res = await Api.post(`comments/${id}`, {
          content,
          isSecret,
          postType,
        });
        //새댓글도 보여주기
        if (res.status === 200 || res.status === 201) {
          resetInputBox();
          try {
            const res = await Api.get(`comments/${id}`);
            setCommentList(res.data.comments.reverse());
          } catch (err) {
            console.log("댓글저장 후 다시 불러오기 에러", err);
          }
        }
      } catch (err) {
        console.log("댓글저장에러", err);
      }
    }
  };

  //로그인 필요 알림
  const LoginToHavePermission = () => {
    if (!isLogin) {
      if (
        confirm(
          "로그인이 필요한 기능입니다.\n로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }
    }
  };

  return (
    <div className={Cmt.container}>
      <div className={Cmt.commentsContainer}>
        <div className={Cmt.inputBox}>
          <div>
            <label className={Cmt.secretBtn}>
              <input type="checkbox" checked={isSecret} onClick={() => {setIsSecret(!isSecret)}}/>
              비공개
            </label>
          </div>
          <div>
            <textarea
              className={Cmt.textArea}
              placeholder={isLogin? "댓글을 입력하세요":"로그인 한 유저만 댓글을 남길 수 있습니다."}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                LoginToHavePermission();
              }}
            ></textarea>
          </div>
          <div className={Cmt.commentSubmitBtnContainer}>
            <button className={Cmt.commentSubmitBtn} onClick={commentPost}>
              댓글작성
            </button>
          </div>
        </div>
        {commentList.map((comment) => {
          return (
            <Comment
              key={comment._id}
              postAuthorName={authorName}
              content={comment.content}
              createdAt={comment.createdAt}
              isSecret={comment.isSecret}
              writer={comment.writer}
              writingId={comment.writingId}
              comment_id={comment._id}
              postType={postType}
              setCommentList={setCommentList}
              id={id}
            />
          );
        })}
        <div />
      </div>
    </div>
  );
};

export default Comments;
