import { useState, useEffect } from "react";
import { RoundBtn, black, white } from "../buttons/BasicBtn";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Textarea from "@mui/joy/Textarea";
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
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const { user } = useUserStore();
  
  const resetInputBox = () => {
    setOpenCommentBox(false);
    setIsSecret(false);
    setContent("");
  }
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
          className={Cmt.nestedCommentInput}
          placeholder="답글 추가..."
          onChange={(e)=>setContent(e.target.value)}
        ></input>
      </div>
      <div className={Cmt.nestedCmtBtnBox} >
        <RoundBtn theme={white} type="button" onClick={resetInputBox}>취소</RoundBtn>
        <RoundBtn theme={black} type="button"onClick={commentPost}>
          답글
        </RoundBtn>
      </div>
    </div>
  );
};
export default CommentInput;
