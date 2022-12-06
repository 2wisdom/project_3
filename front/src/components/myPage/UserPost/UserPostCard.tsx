import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import * as CommunityCardInterface from "../../../store/CommunityShowCard";
import Card from "../../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "../../../store/Login";
import Stack from "@mui/material/Stack";
import { SquareBtn, white, black } from "../../../styles/buttons/BasicBtn";
import * as Api from "../../../api/Api";

interface showCard {
  key: string;
  _id: string;
  image: string;
  title: string;
  userImage: string;
  userName: string;
  date: string;
}

const UserPostCard = ({
  key,
  _id,
  image,
  title,
  userName,
  date,
}: showCard) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const createDate = date.split("T");
  console.log(_id, key, image, title, userName, date,)

  const deleteCard = async () => {
     if (confirm("정말 삭제하시겠습니까?")){
      try{
      const res = await Api.delete ("posts",  `${_id}`);
      if (res.status == 200){
        await 
      }
     }catch(err){
      alert("게시물 삭제 도중 오류가 발생했습니다. 다시 시도해주세요")
     }
     }
  }


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
          <SquareBtn theme={white} type="button" onClick={deleteCard}>
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
