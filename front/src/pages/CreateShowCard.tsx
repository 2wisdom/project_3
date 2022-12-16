import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../styles/showOffPage/CreateShowCard.module.css";
import blankImg from "../../assets/community/blankImg.png";
import * as Api from "../api/Api";
import uploadImg from "../../assets/findPlant/upload.png";
import axios from "axios";

interface ShowCardData {
  title: string;
  contents: string;
  imageUrl: string;
}
const CreateShowCard = () => {
  const navigate = useNavigate();
  const [ShowCardData, setShowCardData] = useState<ShowCardData>({
    title: "",
    contents: "",
    imageUrl: "",
  });
  const formData = new FormData();
  const [showCardImage, setShowCardImage] = useState({
    imageFileUrl: "",
    previewURL: uploadImg,
  });
  const [content, setContent] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onChangeImage = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    let result = "";
    const correctForm = /(.*?)\.(jpg|jpeg|png)$/;
    if (!e.target.files[0].name.match(correctForm)) {
      alert("소문자로 된  png, jpg, jpeg 확장자 파일만 업로드 가능합니다.");
      return;
    } else {
      if (!showCardImage.imageFileUrl) {
        reader.onload = async () => {
          if (reader.readyState === 2) {
            formData.append("image", e.target.files[0] as any);
            if (formData) {
              try {
                let res = await Api.post("images/image-upload", formData, true);
                result = res.data.url;
              } catch (err) {
                alert(
                  "이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요"
                );
              }
            }
            setShowCardImage({
              imageFileUrl: result,
              previewURL: reader.result,
            });
            setShowCardData((prev) => ({
              ...prev,
              imageUrl: result,
            }));
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };
  const handleSetValue = () => {
    if (contentRef.current !== null) {
      const text = contentRef.current.value;
      setContent(text);
      setShowCardData((prev) => ({
        ...prev,
        contents: text,
      }));
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e: any
  ) => {
    e.preventDefault();
    try {
      const res = await Api.post("posts", ShowCardData);
      if (res.status === 200 || res.status === 201) {
        alert("자랑하기 업로드 성공");
        navigate("/communityShowOff");
      }
    } catch (err) {
      alert("게시물 저장 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <form>
      <div className={Create.container}>
        <div className={Create.Inner}>
          <input
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
                src={showCardImage.previewURL}
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
          <textarea
            maxLength={599}
            className={Create.content}
            ref={contentRef}
            value={content}
            onChange={handleSetValue}
            placeholder="내용을 입력하세요"
          ></textarea>
          <div className={Create.btnInner}>
            <button
              type="button"
              className={Create.cancelBtn}
              onClick={() => {
                navigate("/communityShowOff");
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

export default CreateShowCard;
