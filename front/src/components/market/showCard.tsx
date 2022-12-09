import { useNavigate } from "react-router-dom";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";

interface Props {
  contents: string;
  imageUrl: string;
  title: string;
  authorName: string;
  authorImageUrl: string;
  date: string;
  price: number;
  _id: string;
  category: string;
  isSoldOut: boolean;
}

const showCard = ({
  _id,
  imageUrl,
  title,
  authorName,
  authorImageUrl,
  date,
  contents,
  price,
  category,
  isSoldOut,
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={Card.inner}>
        <div className={Card.imageWrap}>
          <img
            className={
              isSoldOut ? `${Card.Image} ${Card.soldOutImage}` : Card.Image
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = imageError;
            }}
            src={`${imageUrl}`}
            style={{ width: 267, height: 200 }}
            onClick={() => navigate(`/marketCardDetail/${_id}`)}
          />
          {isSoldOut && <p className={Card.soldOutText}>품 절</p>}
        </div>
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
