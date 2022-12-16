import Card from "../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";
import { useNavigate } from "react-router-dom";


const ShowCard = ({
  postId,
  image,
  title,
  userImage,
  userName,
  date,
}: {
  postId: string;
  image: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
}) => {
  const navigate = useNavigate();
  const createDate = date?.split("T");
  console.log("userImage", userImage);
  return (
    <div className={Card.inner}>
      <img
        className={Card.image}
        src={`${image}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = imageError;
        }}
        onClick={() => navigate(`/showCardDetail/${postId}`)}
      />
      <h3
        className={Card.title}
        onClick={() => navigate(`/showCardDetail/${postId}`)}
      >
        {title}
      </h3>
      <div className={Card.footer}>
        <div className={Card.userInner}>
          <Avatar
            alt="Remy Sharp"
            src={`http://${window.location.hostname}:5000/${userImage}`}
            sx={{ width: 24, height: 24 }}
            onClick={() => navigate(`/showCardDetail/${postId}`)}
          />

          <span
            className={Card.userName}
            onClick={() => navigate(`/showCardDetail/${postId}`)}
          >
            {userName}
          </span>
        </div>
        <div
          className={Card.data}
          onClick={() => navigate(`/showCardDetail/${postId}`)}
        >
          {createDate[0]}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
