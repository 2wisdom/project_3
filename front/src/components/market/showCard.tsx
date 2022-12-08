import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as CommunityCardInterface from "../../store/CommunityShowCard";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "../../store/Login";
import Stack from "@mui/material/Stack";
import { SquareBtn, white, black } from "../../styles/buttons/BasicBtn";
import * as Api from "../../api/Api";
import { TopNavStore, pageStore } from "@/store/MyPage";

const showCard = ({
  key,
  _id,
  imageUrl,
  title,
  userName,
  date,
  contents,
  showCards,
  setShowCards,
  price,
}: // marketCategory,
props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const createDate = date.split("T");
  const { pickedTopNav } = TopNavStore();
  const { page } = pageStore();
  const isMarketTap = pickedTopNav.name === "식물마켓";

  return (
    <>
      <div className={Card.inner}>
        <img
          className={Card.Image}
          src={`${imageUrl}`}
          style={{ width: 267, height: 200 }}
          onClick={() => navigate(`/showCardDetail/${_id}`)}
        />
        <h3
          className={Card.title}
          onClick={() => navigate(`/showCardDetail/${_id}`)}
        >
          {title}
        </h3>
        <div
          className={Card.footer}
          onClick={() => navigate(`/showCardDetail/${_id}`)}
        >
          <div className={Card.userInner}>
            {/* <img className={Card.userImage}></img> */}
            <Avatar
              alt="Remy Sharp"
              src={`http://${window.location.hostname}:5000/${user.imageUrl}`}
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>{userName}</h5>
          </div>
          <div className={Card.data}>{`${price}원`}</div>
        </div>
      </div>
    </>
  );
};

export default showCard;
