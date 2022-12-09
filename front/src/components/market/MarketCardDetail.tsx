import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import Detail from "../../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";
import SplitBtn from "../buttons/SplitBtn";
import UserCard from "../myPage/EditUserInfo/UserCard";
import useUserStore from "@/store/Login";

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
  isSoldOut: boolean;
}

const MarketCardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const [DetailData, setDetailData] = useState<DetailData>({
    author: { imageUrl: "", name: "", _id: "" },
    category: "",
    contents: "",
    createdAt: "",
    imageUrl: "",
    title: "",
    price: 0,
    isSoldOut: false
  });
  const [seletedCategoryIndex, setSeletedCategoryIndex] = useState(0);
  const createDate = DetailData.createdAt.split("T");
  const isAuthor= DetailData.author.name === user.name
  const getCardData = async () => {
    try {
      const res = await Api.get("markets", id as string);
      setDetailData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const changeToSold = () => {
  //   try{
  //     const res = Api.

  //응답이 잘왔다. DetailData의 isSoldOut True로.

  //   }
  // }

  useEffect(() => {
    getCardData();
  }, [id]);

  useEffect(() => {
    if (seletedCategoryIndex === 1) {
      if (
        confirm(
          "판매완료로 바꾸시겠습니까? 판매완료처리 후 되돌리실 수 없습니다."
        )
      ) {
        // changeToSold();
      } else {
        setSeletedCategoryIndex(0);
      }
    }
  }, [seletedCategoryIndex]);

  console.log(seletedCategoryIndex);
  const categoryList = ["판매중", "판매완료"];

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
        <div className={Detail.price}>
          {DetailData.price.toLocaleString("ko-KR")} 원
        </div>
      </div>
      {isAuthor &&!Detail.isSoldOut && (
        <div className={Detail.soldOutBtnBox}>
          <SplitBtn
            seletedCategoryIndex={seletedCategoryIndex}
            setSeletedCategoryIndex={setSeletedCategoryIndex}
            categoryList={categoryList}
          />
        </div>
      )}
      <div className={Detail.imageWrap}>
        <img
          className={
            Detail.isSoldOut ? `${Detail.image} ${Detail.soldOutImage}` : Detail.image
          }
          src={DetailData.imageUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imageError;
          }}
        />
        {Detail.isSoldOut && <p className={Detail.soldOutText}>품 절</p>}
      </div>
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
