import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import Detail from "../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import imageError from "../../assets/error/imageError.jpg";
import { CheckBox } from "@mui/icons-material";
import Comments from "../components/comment/Comments";

interface DetailData {
  title: string;
  userImg: string;
  userName: string;
  date: string;
  imageUrl: string;
  contents: string;
}

const AskCardDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
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
      Api.get(`asks/${id}`, null)
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
      Api.get(`comments/${id}`, null)
        .then((res) => {
          console.log(`res.data-comments`, res);
        })
        .catch((err) => {
          console.log("err-comments", err);
        });
    }
  }, []);
  return (
    <div className={Detail.container}>
      <div className={Detail.title}>{DetailData.title}</div>
      <div className={Detail.userInner}>
        <Avatar
          alt="userImg"
          src={`http://${window.location.hostname}:5000/${DetailData.userImg}`}
          sx={{ width: 24, height: 24 }}
        />
        <div className={Detail.userName}>{DetailData.userName}</div>

        <div className={Detail.date}>{createDate[0]}</div>
      </div>
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
          navigate("/communityAsk");
        }}
      >
        목록
      </button>
      <Comments authorName={DetailData.userName} id={id} postType={"Ask"} />
    </div>
  );
};

export default AskCardDetail;
