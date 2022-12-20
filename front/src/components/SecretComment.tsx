import Cmt from "../styles/Comment.module.css";
import Avatar from "@mui/material/Avatar";

interface Props{
  createdAt: string
}
const Comment = ({createdAt}:Props) => {
  const date = createdAt.split("T");
  const time = date[1].slice(0,5)

  return (
    <div className={Cmt.footer}>
      <div className={Cmt.Inner}>
        <div >
        비밀댓글입니다.
        </div>
        <div className={Cmt.userInner}>
          <h5>
            {date[0]} {time}
          </h5>
        </div>
      </div>
    </div>
  );
};
export default Comment;
