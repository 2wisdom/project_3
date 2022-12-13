import Cmt from "../../styles/Comment.module.css";
import useUserStore from "@/store/Login";
import Avatar from "@mui/material/Avatar";
import { SquareBtn, black, white } from "../buttons/BasicBtn";
import * as Api from "../../api/Api";

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
  isPostAuthor: boolean;
  content: string;
  createdAt: string;
  isSecret: boolean;
  writer: Writer;
  parentComment_id: string;
  nestedComment_id: string;
  setNestedCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const NestedComment = ({
  isPostAuthor,
  content,
  createdAt,
  isSecret,
  writer,
  parentComment_id,
  nestedComment_id,
  setNestedCommentList,
}: Props) => {
  const { user } = useUserStore();
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5);
  const CanSeeComment = !isSecret || isPostAuthor || writer.name === user.name;

  //대댓글 삭제
  const deleteNestedComment = async () => {
    if (confirm("댓글을 정말 삭제하시겠습니까?")) {
      try {
        console.log(nestedComment_id)
        const res = await Api.delete("comments", nestedComment_id);
        alert("댓글이 삭제되었습니다.");
        //대댓글 재로드
        try {
          const res = await Api.get(`comments/${parentComment_id}`);
          setNestedCommentList(res.data.comments.reverse());
        } catch (err) {
          alert("댓글 재로드중 오류가 발생했습니다.");
          console.log("err-comments", err);
        }
      } catch (err) {
        alert("댓글 삭제도중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className={Cmt.nastedCommentBox}>
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
      </div>
      <div className={Cmt.Cmt}>
        <div>{CanSeeComment ? content : "비밀댓글입니다."}</div>
        <div className={Cmt.CmtBtn}>
          <SquareBtn theme={black} type="button" onClick={deleteNestedComment}>
            삭제
          </SquareBtn>
        </div>
      </div>
    </div>
  );
};

export default NestedComment;
