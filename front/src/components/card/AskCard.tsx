import Card from "../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";
import { useNavigate } from "react-router-dom";

const AskCard = ({
  askId,
  image,
  title,
  userImage,
  userName,
  date,
}: {
  askId: string;
  image: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
}) => {
  console.log("askId", askId);
  const navigate = useNavigate();
  const createDate = date?.split("T");
  return (
    <div className={Card.inner}>
      <img
        className={Card.Image}
        src={`${image}`}
        style={{ width: 267, height: 200 }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = imageError;
        }}
        onClick={() => navigate(`/askCardDetail/${askId}`)}
      />
      <h3
        className={Card.title}
        onClick={() => navigate(`/askCardDetail/${askId}`)}
      >
        {title}
      </h3>
      <div className={Card.footer}>
        <div className={Card.userInner}>
          <Avatar
            src={`http://${window.location.hostname}:5000/${userImage}`}
            sx={{ width: 24, height: 24 }}
            onClick={() => navigate(`/askCardDetail/${askId}`)}
          />

          <h5
            className={Card.userName}
            onClick={() => navigate(`/askCardDetail/${askId}`)}
          >
            {userName}
          </h5>
        </div>
        <div
          className={Card.data}
          onClick={() => navigate(`/askCardDetail/${askId}`)}
        >
          {createDate[0]}
        </div>
      </div>
    </div>
  );
};

export default AskCard;
