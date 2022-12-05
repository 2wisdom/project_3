import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import * as CommunityCardInterface from "../../../store/CommunityShowCard";
import Card from "../../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "../../../store/Login";
import Stack from "@mui/material/Stack";
import { SquareBtn, white, black } from "../../../styles/buttons/BasicBtn";

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
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
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
              src={`http://${window.location.hostname}:5000/${user.imageUrl}`}
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>{userName}</h5>
          </div>
          <div className={Card.data}>{createDate[0]}</div>
        </div>
        <Stack direction="row" alignItems="center" spacing={2}>
          <SquareBtn theme={white} type="button">
            삭제
          </SquareBtn>
          <SquareBtn theme={black} type="button">
            수정
          </SquareBtn>
        </Stack>
      </div>
    </>
  );
};

export default UserPostCard;
