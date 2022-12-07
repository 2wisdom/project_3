import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../styles/showOffPage/CreateShowCard.module.css";
import blankImg from "../../assets/community/blankImg.png";
import * as Api from "../api/Api";
import axios from "axios";
import { response } from "express";

interface AskCardData {
  title: string;
  contents: string;
  imageUrl: string;
}
const CreateAskCard = () => {
  const navigate = useNavigate();
  const [askCardData, setAskCardData] = useState<AskCardData>({
    title: "",
    contents: "",
    imageUrl: "",
  });
  const formData = new FormData();
  const [title, setTitle] = useState("");
  const [askCardImage, setAskCardImage] = useState({
    imageFileUrl: "",
    previewURL: blankImg,
  });
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onChangeImage = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    let result = "";
    // let res = {};
    if (!askCardImage.imageFileUrl) {
      reader.onload = async () => {
        if (reader.readyState === 2) {
          formData.append("image", e.target.files[0] as any);
          if (formData) {
            try {
              let res = axios({
                method: "post",
                url: "http://localhost:5000/images/image-upload",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
              result = (await res).data.url;
              console.log("result: ", result);
            } catch (err) {
              console.log("imageErr", err);
            }
          }
          setAskCardImage({
            imageFileUrl: result,
            previewURL: reader.result,
          });
          setAskCardData((prev) => ({
            ...prev,
            imageUrl: result,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSetValue = () => {
    if (contentRef.current != null) {
      const text = contentRef.current.value;
      setContent(text);
      setAskCardData((prev) => ({
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
      const res = await Api.post("asks", askCardData);
      if (res.status === 200 || res.status === 201) {
        console.log("res : ", res);
        alert("게시물 올리기 성공!");
        navigate("/communityAsk");
      }
    } catch (err) {
      console.log("err : ", err);
      alert("게시물 올리기 실패!");
    }
  };
  return (
    <form>
      <div className={Create.container}>
        <div className={Create.Inner}>
          <input
            className={Create.title}
            onChange={(e) =>
              setAskCardData((prev) => ({
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
                src={askCardImage.previewURL}
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
          <textarea
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
                navigate("/communityAsk");
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

export default CreateAskCard;
