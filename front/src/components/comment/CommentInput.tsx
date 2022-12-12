import { useState, useEffect } from "react";
import { RoundBtn, black } from "../buttons/BasicBtn";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Textarea from "@mui/joy/Textarea";
import * as Api from "../../api/Api";
import Cmt from "../../styles/Comment.module.css";

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
  postType:string
}

const CommentInput = ({
  comment_id,
  setNestedCommentList,
  setOpenCommentBox,
  postType
}: props) => {
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  const commentPost = async () => {
    try {
      const res = await Api.post(`comments/${comment_id}`, {
        content,
        isSecret,
        postType
      });
      //새 대댓글도 보여주기
      if (res.status === 200 ||res.status === 201) {
        setOpenCommentBox(false);
        //textArea clear, 체크박스 reset
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
    <div className={Cmt.inputBox}>
      <div className={Cmt.inputBoxInner}>
        <Box>
          <Checkbox
            label="비공개"
            size="lg"
            onChange={() => setIsSecret(!isSecret)}
          />
        </Box>
        <Textarea
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={2}
          maxRows={4}
        />
        {/* <textarea /> */}
        <div>
          <RoundBtn theme={black} onClick={commentPost}>
            댓글작성
          </RoundBtn>
        </div>
      </div>
    </div>
  );
};
export default CommentInput;
