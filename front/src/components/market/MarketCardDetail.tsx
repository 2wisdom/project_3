import { useEffect, useState } from "react";
import Detail from "../../styles/showOffPage/ShowCardDetail.module.css";
import * as Api from "../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import imageError from "../../../assets/error/imageError.jpg";
import SplitBtn from "../buttons/SplitBtn";
import useUserStore from "@/store/Login";
import Comments from "../../components/comment/Comments";


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
  const [detailData, setDetailData] = useState<DetailData>({
    author: { imageUrl: "", name: "", _id: "" },
    category: "",
    contents: "",
    createdAt: "",
    imageUrl: "",
    title: "",
    price: 0,
    isSoldOut: false,
  });
  const [seletedCategoryIndex, setSeletedCategoryIndex] = useState(0);
  const createDate = detailData.createdAt.split("T");
  const isAuthor= detailData.author.name === user.name
  const categoryList = ["판매중", "판매완료"];

  const getCardData = async () => {
    try {
      const res = await Api.get("markets", id as string);
      setDetailData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeToSold = async() => {
    try{
      const res = await Api.put(`markets/${id}/soldOut`, {isSoldOut:true})
      if (res.status === 200){
        setDetailData((prev)=>({...prev, isSoldOut: true}))
      }
    } catch(err){
      alert("판매완료 처리중 오류가 발생했습니다. 다시 시도해주세요.")
    }
  }

  useEffect(() => {
    getCardData();
  }, [id]);

  useEffect(() => {
    if (seletedCategoryIndex === 1) {
      if (
        confirm(
          "판매완료 후 되돌리실 수 없습니다.\n판매완료로 바꾸시겠습니까? "
        )
      ) {
        changeToSold();
      } else {
        setSeletedCategoryIndex(0);
      }
    }
  }, [seletedCategoryIndex]);

  console.log(seletedCategoryIndex);

  return (
    <div className={Detail.container}>
      <div className={Detail.title}>
        [{detailData.category}] {detailData.title}
      </div>
      <div className={Detail.userInner}>
        <Avatar
          alt="user profile image"
          src={`http://${window.location.hostname}:5000/${detailData.author.imageUrl}`}
          sx={{ width: 24, height: 24 }}
        />
        <div className={Detail.userName}>{detailData.author.name}</div>
        <div className={Detail.date}>{createDate[0]}</div>
        <div className={Detail.price}>
          {detailData.price.toLocaleString("ko-KR")} 원
        </div>
      </div>
      {isAuthor && !detailData.isSoldOut && (
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
            detailData.isSoldOut ? `${Detail.image} ${Detail.soldOutImage}` : Detail.image
          }
          src={detailData.imageUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imageError;
          }}
        />
        {detailData.isSoldOut && <p className={Detail.soldOutText}>판매완료</p>}
      </div>
      <p className={Detail.contents}>{detailData.contents}</p>
      <button
        className={Detail.btn}
        onClick={() => {
          navigate("/market");
        }}
      >
        목록
      </button>
      <Comments authorName={detailData.author.name} id={id} postType={"Market"}/>
    </div>
  );
};

export default MarketCardDetail;
