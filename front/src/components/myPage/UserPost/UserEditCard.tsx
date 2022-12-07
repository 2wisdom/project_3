import React, { RefObject, useEffect, useRef, useState } from "react";
import UserCard from "../EditUserInfo/UserCard";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../../../api/Api";
import Create from "../../../styles/showOffPage/CreateShowCard.module.css";
import axios from "axios";
import ShowCard from "@/components/card/ShowCard";

interface ShowCardData {
  title: string;
  contents: string;
  imageUrl: string;
  price?: number;
}
const UserEditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state.title;
  const contents = location.state.contents;
  const imageUrl = location.state.imageUrl;
  const category = location.state.category;
  const price = location.state.price;
  const _id: string = location.state._id;
  console.log(location.state);
  const [ShowCardData, setShowCardData] = useState<ShowCardData>({
    title,
    contents,
    imageUrl,
    price,
  });

  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onChangeImage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0] as any);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/images/image-upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = res.data.url;
      setShowCardData((prev) => ({
        ...prev,
        imageUrl: result,
      }));
    } catch (err) {
      console.log("imageErr", err);
      alert("이미지 수정 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const res = await Api.put(`${category}/${_id}`, ShowCardData);
      if (res.status === 200 || res.status === 201) {
        navigate(`/showCardDetail/${_id}`);
      }
    } catch (err) {
      console.log("err : ", err);
      alert("게시물 수정 도중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <form>
      <div className={Create.container}>
        <div className={Create.Inner}>
          <input
            value={ShowCardData.title}
            className={Create.title}
            onChange={(e) =>
              setShowCardData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="제목을 입력하세요"
          ></input>
          <div className={Create.imgInner}>
            <form
              name="showCardImage"
              encType="multipart/form-data"
              accept-charset="UTF-8"
            >
              <img
                className={Create.Img}
                src={ShowCardData.imageUrl}
                onClick={() => {
                  if (fileInput.current != null) {
                    fileInput.current.click();
                  }
                }}
              ></img>
            </form>
            <input
              type="file"
              style={{ opacity: "0" }}
              accept="image/jpg, image/png, image/jpeg"
              name="explain"
              multiple
              onChange={onChangeImage}
              ref={fileInput}
            ></input>
            <input
              type="number"
              value={ShowCardData.price}
              className={Create.priceInput}
              placeholder="가격을 입력하세요"
              step="100"
              onChange={(e) =>
                setShowCardData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            >
              {ShowCardData.price}
            </input>
          </div>
          <textarea
            className={Create.content}
            ref={contentRef}
            value={ShowCardData.contents}
            onChange={(e) =>
              setShowCardData((prev) => ({
                ...prev,
                contents: e.target.value,
              }))
            }
            placeholder="내용을 입력하세요"
          ></textarea>
          <div className={Create.btnInner}>
            <button
              type="button"
              className={Create.cancelBtn}
              onClick={() => {
                navigate("/myPage/userPost");
              }}
            >
              취소
            </button>
            <button
              type="button"
              className={Create.checkBtn}
              onClick={handleSubmit}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserEditCard;
