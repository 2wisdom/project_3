import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import * as CommunityCardInterface from "../../store/CommunityShowCard";
import Card from "../../styles/showOffPage/ShowCard.module.css";
// import imageSample from "../../../assets/infoPage/main.png";
// import imageSample from "../../../assets/infoPage/main.png";
import imageSample from "../../../assets/infoPage/main.png";
import Avatar from "@mui/material/Avatar";
import * as showCardStore from "../../store/CommunityShowCard";
import { height } from "@mui/system";
import { split } from "../../store/CommunityShowCard";
import imageError from "../../../assets/error/imageError.jpg";
import { useNavigate } from "react-router-dom";
import ShowCardDetail from "@/pages/ShowCardDetail";

// export interface DetailOpenProps {
//   postId: string;
//   isDetailOpen: boolean;
//   setIsDetailOpen: Dispatch<SetStateAction<boolean>>;
// }
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
          {/* <img className={Card.userImage}></img> */}
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
