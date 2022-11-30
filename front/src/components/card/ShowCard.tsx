import React from "react";
import * as CommunityCardInterface from "../../store/CommunityShowCard";
import Card from "../../styles/showOffPage/ShowCard.module.css";
// import imageSample from "../../../assets/infoPage/main.png";
// import imageSample from "../../../assets/infoPage/main.png";
import imageSample from "../../../assets/infoPage/main.png";
import Avatar from "@mui/material/Avatar";
import * as showCardStore from "../../store/CommunityShowCard";

const ShowCard = ({
  key,
  image,
  title,
  userImage,
  userName,
  date,
}: {
  key: string;
  image: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
}) => {
  // console.log("userName", userName);

  return (
    <>
      <div className={Card.inner}>
        <img className={Card.Image} src={image}></img>
        {/* <img className={Card.image}></img> */}
        <h3 className={Card.title}>{title}</h3>
        <div className={Card.footer}>
          <div className={Card.userInner}>
            {/* <img className={Card.userImage}></img> */}
            <Avatar
              alt="Remy Sharp"
              src={userImage}
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>{userName}</h5>
          </div>
          <div className={Card.data}>{date}</div>
        </div>
      </div>
    </>
  );
};

export default ShowCard;
