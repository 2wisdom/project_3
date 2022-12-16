import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api/Api";
import Create from "../../styles/showOffPage/CreateShowCard.module.css";
import axios from "axios";
import SplitButton from "../buttons/SplitBtn";
import uploadImg from "../../../assets/findPlant/upload.png";
interface MarketCardData {
  category: string;
  title: string;
  price: number | undefined;
  contents: string;
  imageUrl: string;
}

const CreateMarketCard = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const [marketCardData, setMarketCardData] = useState<MarketCardData>({
    category: "구근/뿌리묘/모종",
    title: "",
    price: undefined,
    contents: "",
    imageUrl: uploadImg,
  });
  const [seletedCategoryIndex, setSeletedCategoryIndex] = useState(0);
  const SUCCESS_STATUS = [200, 201];

  const categoryList = ["구근/뿌리묘/모종", "다육식물", "씨앗", "기타"];

  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    e.preventDefault();
    const correctForm = /(.*?)\.(jpg|jpeg|png)$/;
    if (e.target.files != null && !e.target.files[0].name.match(correctForm)) {
      alert("소문자로 된  png, jpg, jpeg 확장자 파일만 업로드 가능합니다.");
      return;
    } else {
      formData.append("image", e.target.files![0]);
      try {
        const res = await Api.post("images/image-upload", formData, true);
        const result = res.data.url;
        setMarketCardData((prev) => ({
          ...prev,
          imageUrl: result,
        }));
      } catch (err) {
        console.log("imageErr", err);
        alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  useEffect(() => {
    setMarketCardData((prev) => ({
      ...prev,
      category: categoryList[seletedCategoryIndex],
    }));
  }, [seletedCategoryIndex]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const res = await Api.post(`markets`, marketCardData);
      if (SUCCESS_STATUS.includes(res.status)) {
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
            seletedCategoryIndex={seletedCategoryIndex}
            setSeletedCategoryIndex={setSeletedCategoryIndex}
            categoryList={categoryList}
          />
        </div>
        <div className={Create.Inner}>
          <input
            value={marketCardData.title}
            className={Create.title}
            onChange={(e) =>
              setMarketCardData((prev) => ({
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
                src={marketCardData.imageUrl}
                onClick={() => {
                  if (fileInput.current !== null) {
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
              value={marketCardData.price}
              className={Create.priceInput}
              placeholder="가격을 입력하세요"
              onChange={(e) =>
                setMarketCardData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />{" "}
            원
          </div>
          <textarea
            maxLength={599}
            className={Create.content}
            ref={contentRef}
            value={marketCardData.contents}
            onChange={(e) =>
              setMarketCardData((prev) => ({
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
