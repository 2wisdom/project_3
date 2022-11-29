import React from "react";
import * as CommunityCardInterface from "../../store/CommunityShowCard";
import Card from "../../styles/showOffPage/ShowCard.module.css";
// import imageSample from "../../../assets/infoPage/main.png";
// import imageSample from "../../../assets/infoPage/main.png";
import Avatar from "@mui/material/Avatar";

const ShowCard = ({
  key,
  image,
  title,
  userImage,
  userName,
  date,
}: {
  key: any;
  image: any;
  title: any;
  userImage: any;
  userName: any;
  date: any;
}) => {
  console.log("image", image);
  return (
    <>
      <div className={Card.inner}>
        {/* <img className={Card.Image} src={imageSample}></img> */}
        <img className={Card.image}>{image}</img>
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
