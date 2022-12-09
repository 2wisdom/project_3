import { useState, useEffect } from "react";
import { RoundBtn, black } from "./buttons/BasicBtn";
import * as React from "react";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Cmt from "../styles/Comment.module.css";
import Comment from "./Comment";
import SecretComment from "./SecretComment";
import * as Api from "../api/Api";
import useUserStore from "@/store/Login";
import { CommentsDisabledTwoTone } from "@mui/icons-material";

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
  authorName: string;
  id: string | undefined;
}
const Comments = ({ authorName, id }: props) => {
  const { user } = useUserStore();
  const isPostAuthor = user.name === authorName;
  // const isCommentWriter =
  const [isClickSecret, setIsClickSecret] = useState(false);
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [commentList, setCommentList] = useState<comment[]>([]);
  
  //처음 댓글 불러오기
  useEffect(() => {
    if (id) {
      Api.get(`comments/${id}`)
        .then((res) => {
          setCommentList(res.data.comments);
          console.log(`res.data-comments`, res);
        })
        .catch((err) => {
          console.log("err-comments", err);
        });
    }
  }, []);
  console.log(content, isSecret)

  const commentPost = async() => {
    try{
      const res = await Api.post(`comments/${id}`, {
      content, isSecret
    })
    //새댓글도 보여주기
    if (res.status === 200 || 201){
      try{
        const res = await Api.get(`comments/${id}`)
        setCommentList(res.data.comments)
      }catch (err){
        console.log("댓글저장 후 다시 불러오기 에러", err)
      }
    }
  } catch (err) {
      console.log("댓글저장에러", err)
    }
    
  }
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
          <Checkbox label="비공개" size="lg" onChange={()=>setIsSecret(!isSecret)}/>
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
          <RoundBtn theme={black} onClick={commentPost}>댓글작성</RoundBtn>
        </div>
        {commentList.reverse().map((comment) => {
          return (
            (!comment.isSecret ||
            isPostAuthor ||
            comment.writer.name === user.name )
            ?
            <Comment 
            content={comment.content}
            createdAt={comment.createdAt}
            isSecret={comment.isSecret}
            writer={comment.writer}
            writingId={comment.writingId}
            post_id={comment._id}
            />:
            <SecretComment 
            createdAt={comment.createdAt}/>
          );
        })}
      </div>
      " 하하"
    </div>
  );
};

export default Comments;