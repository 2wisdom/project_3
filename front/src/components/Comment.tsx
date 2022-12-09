import Cmt from "../styles/Comment.module.css";
import Avatar from "@mui/material/Avatar";

interface writer {
  name: string;
  _id: string;
  imageUrl: string;
}

interface props {
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: writer;
  writingId: string;
  post_id: string;
}

const Comment = ({
  content,
  createdAt,
  isSecret,
  writer,
  writingId,
  post_id,
}: props) => {
  const date = createdAt.split("T");
  const time = date[1].slice(0,5)

  return (
    <div className={Cmt.footer}>
      <div className={Cmt.Inner}><div>
      {/* (!comment.isSecret ||
            isPostAuthor ||
            comment.writer.name === user.name )
            ? 비밀댓글입니다.:  */}
        {content}</div>
        <div className={Cmt.userInner}>
          <Avatar
            className={Cmt.Avatar}
            alt="Remy Sharp"
            src={`http://${window.location.hostname}:5000/${writer.imageUrl}`}
            sx={{ width: 24, height: 24 }}
          />

          <h5 className={Cmt.userName}>
            {writer.name} | {date[0]} {time}
          </h5>
          <button className={Cmt.btn}> 답글등록 </button>
        </div>
      </div>
    </div>
  );
};
export default Comment;
