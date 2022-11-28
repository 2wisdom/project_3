import React from "react";
import * as CommunityCardInterface from "../../store/CommunityCard";
import Card from "../../styles/showOffPage/ShowOffCard.module.css";
// import imageSample from "../../../assets/infoPage/main.png";
// import imageSample from "../../../assets/infoPage/main.png";
import Avatar from "@mui/material/Avatar";

const ShowOffCard = () => {
  return (
    <>
      <div className={Card.inner}>
        {/* <img className={Card.Image} src={imageSample}></img> */}
        <img className={Card.image}></img>
        <h3 className={Card.title}>오늘 날씨가 너무 좋다</h3>
        <div className={Card.footer}>
          <div className={Card.userInner}>
            {/* <img className={Card.userImage}></img> */}
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>하은</h5>
          </div>
          <div className={Card.data}>2022.07.08</div>
        </div>
      </div>
    </>
  );
};

export default ShowOffCard;
