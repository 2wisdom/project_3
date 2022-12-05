import React from "react";
import { useState } from "react";
import * as CommunityCardInterface from "../../../store/CommunityShowCard";
import Card from "../../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";

interface showCard {
  key: string;
  image: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
}

const UserPostCard = ({
  key,
  image,
  title,
  userImage,
  userName,
  date,
}: showCard) => {
  const createDate = date.split("T");
  console.log("image", image);
  return (
    <>
      <div className={Card.inner}>
        <img
          className={Card.Image}
          src={`${image}`}
          style={{ width: 267, height: 200 }}
        />
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
          <div className={Card.data}>{createDate[0]}</div>
        </div>
      </div>
    </>
  );
};

export default UserPostCard;
