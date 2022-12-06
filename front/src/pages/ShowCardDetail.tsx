import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import Detail from "../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import imageError from "../../assets/error/imageError.jpg";

interface DetailData {
  title: string;
  userImg: string;
  userName: string;
  date: string;
  imageUrl: string;
  contents: string;
}

// }const ShowCardDetail = ({ postId }: { postId: string }) => {
const ShowCardDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  // let realId = parseInt(id as string);
  // console.log("realId", realId);
  const [DetailData, setDetailData] = useState<DetailData>({
    title: "",
    userImg: "",
    userName: "",
    date: "",
    imageUrl: "",
    contents: "",
  });
  const createDate = DetailData.date.split("T");
  useEffect(() => {
    if (id) {
      Api.get(`posts/${id}`, null)
        .then((res) => {
          setDetailData({
            title: res.data?.title,
            userImg: res.data?.author?.imageUrl,
            userName: res.data?.author?.name,
            date: res.data?.createdAt,
            imageUrl: res.data?.imageUrl,
            contents: res.data?.contents,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);
  useEffect(() => {
    if (id) {
      Api.get("comments", null)
        .then((res) => {
          console.log("res.data-comments", res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  console.log();
  return (
    <div className={Detail.container}>
      <div className={Detail.title}>{DetailData.title}</div>
      <div className={Detail.userInner}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />
        <div className={Detail.userName}>{DetailData.userName}</div>
        {/* <div className={Detail.line}></div> */}
        <div className={Detail.date}>{createDate[0]}</div>
      </div>

      {/* <hr></hr> */}

      <img
        className={Detail.image}
        src={DetailData.imageUrl}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = imageError;
        }}
      />

      <p className={Detail.contents}>{DetailData.contents}</p>
      <button
        className={Detail.btn}
        onClick={() => {
          navigate("/communityShowOff");
        }}
      >
        목록
      </button>
      {/* <hr></hr> */}
    </div>
  );
};

export default ShowCardDetail;
