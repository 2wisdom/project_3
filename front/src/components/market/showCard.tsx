import { useNavigate } from "react-router-dom";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";

interface props {
  key: string;
  contents: string;
  imageUrl: string;
  title: string;
  authorName: string;
  authorImageUrl: string;
  date: string;
  price: number;
  _id: string;
  category: string;
}

const showCard = ({
  key,
  _id,
  imageUrl,
  title,
  authorName,
  authorImageUrl,
  date,
  contents,
  price,
  category,
}: props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={Card.inner}>
        <img
          className={Card.Image}
          src={`${imageUrl}`}
          style={{ width: 267, height: 200 }}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        />
        <h3
          className={Card.title}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        >
          [{category}] {title}
        </h3>
        <div
          className={Card.footer}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        >
          <div className={Card.userInner}>
            {/* <img className={Card.userImage}></img> */}
            <Avatar
              alt="Remy Sharp"
              src={`http://${window.location.hostname}:5000/${authorImageUrl}`}
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>{authorName}</h5>
          </div>
          <div className={Card.price}>{`${price.toLocaleString(
            "ko-KR"
          )} 원`}</div>
        </div>
      </div>
    </>
  );
};

export default showCard;
