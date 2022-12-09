import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import Detail from "../../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";

interface Author {
  imageUrl: string;
  name: string;
  _id: string;
}

interface DetailData {
  author: Author;
  category: string;
  contents: string;
  createdAt: string;
  imageUrl: string;
  title: string;
  price: number;
}

const MarketCardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [DetailData, setDetailData] = useState<DetailData>({
    author: { imageUrl: "", name: "", _id: "" },
    category: "",
    contents: "",
    createdAt: "",
    imageUrl: "",
    title: "",
    price: 0,
  });
  const createDate = DetailData.createdAt.split("T");

  const getCardData = async () => {
    try {
      const res = await Api.get("markets", id);
      setDetailData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCardData();
  }, [id]);

  console.log(DetailData);

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
      <div className={Detail.title}>
        [{DetailData.category}] {DetailData.title}
      </div>
      <div className={Detail.userInner}>
        <Avatar
          alt="Remy Sharp"
          src={`http://${window.location.hostname}:5000/${DetailData.author.imageUrl}`}
          sx={{ width: 24, height: 24 }}
        />
        <div className={Detail.userName}>{DetailData.author.name}</div>
        <div className={Detail.date}>{createDate[0]}</div>
        <div className={Detail.price}> {DetailData.price.toLocaleString("ko-KR")} 원</div>
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
    </div>
  );
};

export default MarketCardDetail;
