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

const UserPostCard = ({
  _id,
  content,
  date,
  writingId
}: // isSoldOut
Props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const createDate = date.split("T");
  const { pickedTopNav } = TopNavStore();
  const { page } = pageStore();



  return (
    <div>

    </div>
  );
};

export default UserPostCard;
