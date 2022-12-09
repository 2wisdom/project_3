import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api/Api";
import Create from "../../styles/showOffPage/CreateShowCard.module.css";
import axios from "axios";
import SplitButton from "../buttons/SplitBtn";

interface ShowCardData {
  category: string;
  title: string;
  price: number | undefined;
  contents: string;
  imageUrl: string;
}

const CreateMarketCard = () => {
  const navigate = useNavigate();
  const [ShowCardData, setShowCardData] = useState<ShowCardData>({
    category: "구근/뿌리묘/모종",
    title: "",
    price: undefined,
    contents: "",
    imageUrl: "",
  });
  const categoryList = [
    "구근/뿌리묘/모종",
    "모종(산내들농장)",
    "씨앗",
    "기타",
  ];

  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  console.log(ShowCardData)
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
      alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const res = await Api.post(`markets`, ShowCardData);
      if (res.status === 200 || 201) {
        alert("마켓 업로드 성공");
        navigate(`/marketCardDetail/${res.data.newMarket._id}`);
      }
    } catch (err) {
      console.log("err : ", err);
      alert("게시물 저장 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <form>
      <div className={Create.container}>
        <div className={Create.marketCategoryContainer}>
          <SplitButton
            categoryList={categoryList}
            setShowCardData={setShowCardData}
            originallySelectedIndex={null}
          />
        </div>
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
          </div>
          <div className={Create.priceContainer}>
            <input
              type="number"
              step="100"
              value={ShowCardData.price}
              className={Create.priceInput}
              placeholder="가격을 입력하세요"
              onChange={(e) =>
                setShowCardData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />{" "}
            원
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
                navigate("/market");
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

export default CreateMarketCard;
