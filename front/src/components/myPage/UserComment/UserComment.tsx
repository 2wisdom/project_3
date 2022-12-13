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
}: // isSoldOut
Props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { pickedTopNav } = TopNavStore();
  const { page } = pageStore();
  const date = createdAt.split("T");
  const time = date[1].slice(0, 5);

  return (
    <div>
      <div>{content}</div>
      <div>
        <Avatar
          className={Cmt.Avatar}
          alt="user profile image"
          src={`http://${window.location.hostname}:5000/${user.imageUrl}`}
          sx={{ width: 24, height: 24 }}
        />
        <h5 className={user.name}>
          {user.name} | {date[0]} {time}
        </h5>
      </div>
    </div>
  );
};

export default UserPostCard;
