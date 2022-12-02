import React, { RefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../styles/showOffPage/CreateShowCard.module.css";
import blankImg from "../../assets/community/blankImg.png";
import ShowCard from "@/components/card/ShowCard";
import axios from "axios";
const CreateShowCard = () => {
  const navigate = useNavigate();

  const formData = new FormData();
  const [title, setTitle] = useState("");
  const [showCardImage, setShowCardImage] = useState({
    image_file: "",
    preview_URL: blankImg,
  });
  const [content, setContent] = useState("");

  const fileInput = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onChangeImage = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setShowCardImage({
          image_file: e.target.files[0],
          preview_URL: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSetValue = () => {
    if (contentRef.current != null) {
      const text = contentRef.current.value;
      setContent(text);
    }
  };

  formData.append("imageUrl", showCardImage.image_file);
  formData.append("title", title);
  formData.append("contents", content);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e: any
  ) => {
    e.preventDefault();
    //콘솔 확인용
    // for (let keyValue of formData) {
    //     console.log("keyValue -> ", keyValue);
    //   }
    let res = {};
    try {
      res = await axios({
        method: "post",
        url: "http://localhost:5000/posts",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res : ", res);
      if (res) {
        alert("post성공");
        console.log("res", res);
      }
    } catch (err) {
      console.log("err : ", err);
      alert("post실패!");
    }
  };

  return (
    <form>
      <div className={Create.container}>
        <div className={Create.Inner}>
          <input
            className={Create.title}
            onChange={(e) => setTitle(e.target.value)}
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
                src={showCardImage.preview_URL}
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
