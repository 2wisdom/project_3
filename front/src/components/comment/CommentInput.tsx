import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoundBtn, black, white } from "../buttons/BasicBtn";
import Checkbox from "@mui/joy/Checkbox";
import * as Api from "../../api/Api";
import Cmt from "../../styles/Comment.module.css";
import useUserStore from "@/store/Login";

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
  comment_id: string;
  setNestedCommentList: React.Dispatch<React.SetStateAction<comment[]>>;
  setOpenCommentBox: React.Dispatch<React.SetStateAction<boolean>>;
  postType: string;
}

const CommentInput = ({
  comment_id,
  setNestedCommentList,
  setOpenCommentBox,
  postType,
}: props) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const { user } = useUserStore();
  const isLogin = user.email !== "";

  const resetInputBox = () => {
    setOpenCommentBox(false);
    setIsSecret(false);
    setContent("");
  };

  const commentPost = async () => {
    try {
      const res = await Api.post(`comments/${comment_id}`, {
        content,
        isSecret,
        postType,
      });
      //새 대댓글도 보여주기
      if (res.status === 200 || res.status === 201) {
        setOpenCommentBox(false);
        resetInputBox();
        try {
          const res = await Api.get(`comments/${comment_id}`);
          setNestedCommentList(res.data.comments);
        } catch (err) {
          console.log("댓글저장 후 다시 불러오기 에러", err);
        }
      }
    } catch (err) {
      console.log("댓글저장에러", err);
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
    <div className={Cmt.nestedCommentInputBox}>
      <div>
        <Checkbox
          label="비공개"
          size="lg"
          onChange={() => setIsSecret(!isSecret)}
        />
      </div>
      <div className={Cmt.nestedCmtBox}>
        <div>{user.name}</div>
        <input
          maxLength={599}
          className={Cmt.nestedCommentInput}
          placeholder={isLogin? "답글 추가...":"로그인 한 유저만 댓글을 남길 수 있습니다."}
          onChange={(e) => {LoginToHavePermission(); setContent(e.target.value)}}
        ></input>
      </div>
      <div className={Cmt.nestedCmtBtnBox}>
        <RoundBtn theme={white} type="button" onClick={resetInputBox}>
          취소
        </RoundBtn>
        <RoundBtn theme={black} type="button" onClick={commentPost}>
          답글
        </RoundBtn>
      </div>
    </div>
  );
};
export default CommentInput;
