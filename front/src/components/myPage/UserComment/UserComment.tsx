import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as CommunityCardInterface from "../../../store/CommunityShowCard";
import Card from "../../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "../../../store/Login";
import Stack from "@mui/material/Stack";
import { SquareBtn, white, black } from "../../buttons/BasicBtn";
import * as Api from "../../../api/Api";
import { Props } from "./UserComments";
import { TopNavStore, pageStore } from "@/store/MyPage";
import Cmt from "../../../styles/Comment.module.css";

const UserPostCard = ({
  _id,
  content,
  createdAt,
  writingId,
}:
Props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { pickedTopNav } = TopNavStore();
  const { page } = pageStore();
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5)

  const moveToDetailPage = () => {
    pickedTopNav.name === "질문하기" && navigate(`/askCardDetail/${writingId}`)
    pickedTopNav.name === "자랑하기" && navigate(`/showCardDetail/${writingId}`)
    pickedTopNav.name === "식물마켓" && navigate(`/marketCardDetail/${writingId}`)
  }

  return (
    <div className={Cmt.commentContainer}  onClick={moveToDetailPage}>
      <div>{content}</div>
      <div className={Cmt.nameBox}>
        <Avatar
          className={Cmt.Avatar}
          alt="user profile image"
          src={`http://${window.location.hostname}:5000/${user.imageUrl}`}
          sx={{ width: 24, height: 24 }}
        />
        <span className={user.name}>
          {user.name} | {date[0]} {time}
        </span>
      </div>
    </div>
  );
};

export default UserPostCard;
