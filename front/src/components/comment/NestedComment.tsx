import Cmt from "../../styles/Comment.module.css";
import useUserStore from "@/store/Login";
import Avatar from "@mui/material/Avatar";

interface Writer {
  name: string;
  _id: string;
  imageUrl: string;
}

interface Props {
  isPostAuthor: boolean;
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: Writer;
  parentComment_id: string;
  post_id: string;
}

const NestedComment = ({
  isPostAuthor,
  content,
  createdAt,
  isSecret,
  writer,
  parentComment_id,
  post_id,
}: Props) => {
  const {user} = useUserStore();
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5);
  const CanSeeComment = !isSecret || isPostAuthor || writer.name === user.name;

  return (
    <div className={Cmt.nastedCommentBox}>
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
      </div>
    </div>
  );
};

export default NestedComment;
