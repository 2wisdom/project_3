import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import Detail from "../../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import imageError from "../../../assets/error/imageError.jpg";

interface DetailData {
  title: string;
  userImg: string;
  userName: string;
  date: string;
  imageUrl: string;
  contents: string;
}

const MarketCardDetail = () => {
  const navigate = useNavigate();
  const { params } = useParams();
  const _id = params?.split("/")[1];
  console.log(_id);
  const [DetailData, setDetailData] = useState<DetailData>({
    title: "",
    userImg: "",
    userName: "",
    date: "",
    imageUrl: "",
    contents: "",
  });
  const createDate = DetailData.date.split("T");

  const getCardData = async () => {
    try {
      const res = await Api.get(markets, _id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCardData();
  }, [_id]);

  console.log(res);

  // useEffect(() => {
  //   if (id) {
  //     Api.get(`comments/${id}`, null)
  //       .then((res) => {
  //         console.log(`res.data-comments`, res);
  //       })
  //       .catch((err) => {
  //         console.log("err-comments", err);
  //       });
  //   }
  // }, []);
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
          navigate("/market");
        }}
      >
        목록
      </button>
      {/* <hr></hr> */}
    </div>
  );
};

export default MarketCardDetail;
