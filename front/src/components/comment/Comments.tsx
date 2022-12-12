import { useState, useEffect } from "react";
import { RoundBtn, black } from "../buttons/BasicBtn";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Textarea from "@mui/joy/Textarea";
import Cmt from "../../styles/Comment.module.css";
import Comment from "./Comment";
import * as Api from "../../api/Api";
import useUserStore from "@/store/Login";

interface Writer {
  name: string;
  _id: string;
  imageUrl: string;
}

interface Comment {
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: Writer;
  writingId: string;
  _id: string;
}

interface Props {
  authorName: string;
  id: string | undefined;
  postType: string;
}

const Comments = ({ authorName, id, postType }: Props) => {
  const { user } = useUserStore();
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);

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
  console.log(content, isSecret);

  const commentPost = async () => {
    try {
      const res = await Api.post(`comments/${id}`, {
        content,
        isSecret,
        postType
      });
      //새댓글도 보여주기
      if (res.status === 200 || res.status ===201) {
        //textArea clear, 체크박스 reset
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
  };
  console.log(commentList);
  // return (
  //     <Box
  //       sx={{
  //         py: 2,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         gap: 2,
  //         alignItems: 'center',
  //         flexWrap: 'wrap',
  //       }}
  //     >
  //       <form
  //         onSubmit={(event) => {
  //           event.preventDefault();
  //         }}
  //       >
  //         <Textarea
  //           placeholder="Try to submit with no text!"
  //           required
  //           sx={{ mb: 1 }}
  //         //   disabled =
  //         />
  //         <Button type="submit">Submit</Button>
  //       </form>
  //     </Box>
  //   );
  return (
    <div className={Cmt.container}>
      <div className={Cmt.inputBox}>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
