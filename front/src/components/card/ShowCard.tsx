import React from "react";
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
  const createDate = date.split("T");
  console.log("ShowCard-postId", postId);
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
        onClick={() => {
          navigate("/showCardDetail");
        }}
      />
      <h3
        className={Card.title}
        onClick={() => {
          navigate("/showCardDetail");
        }}
      >
        {title}
      </h3>
      <div className={Card.footer}>
        <div className={Card.userInner}>
          {/* <img className={Card.userImage}></img> */}
          <Avatar
            alt="Remy Sharp"
            src={userImage}
            sx={{ width: 24, height: 24 }}
            onClick={() => {
              navigate("/showCardDetail");
            }}
          />

          <h5
            className={Card.userName}
            onClick={() => {
              navigate("/showCardDetail");
            }}
          >
            {userName}
          </h5>
        </div>
        <div
          className={Card.data}
          onClick={() => {
            navigate("/showCardDetail");
          }}
        >
          {createDate[0]}
        </div>
      </div>
      {postId && <ShowCardDetail postId={postId}></ShowCardDetail>}
    </div>
  );
};

export default ShowCard;
