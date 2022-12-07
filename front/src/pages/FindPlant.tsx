import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../styles/showOffPage/CreateShowCard.module.css";
import blankImg from "../../assets/community/blankImg.png";
import ShowCard from "@/components/card/ShowCard";
import * as Api from "../api/Api";
import axios from "axios";
interface ShowCardData {
  imageFile: string;
  previewURL: string;
}
const FindPlant = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const [plantImage, setPlantImage] = useState<ShowCardData>({
    imageFile: "",
    previewURL: blankImg,
  });
  const fileInput = useRef<HTMLInputElement>(null);

  const onChangeImage = async (e: any) => {
    e.preventDefault();
    formData.append("image", e.target.files[0] as any);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/lens",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = res.data.url;
      setPlantImage((prev) => ({
        ...prev,
        imageFile: result,
      }));
    } catch (err) {
      console.log("imageErr", err);
      alert(" 오류가 발생했습니다. 다시 시도해주세요");
    }
  };
  //   formData.append("image", plantImage.imageFile);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (formData) {
      try {
        let res = axios({
          method: "post",
          url: "http://localhost:5000/lens",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      } catch (err) {
        console.log("imageErr", err);
      }
    }
  };
  return (
    <form>
      <div className={Create.container}>
        <div className={Create.Inner}>
          <div>식물찾기</div>
          <div className={Create.imgInner}>
            <form
              name="showCardImage"
              encType="multipart/form-data"
              accept-charset="UTF-8"
            >
              <img
                className={Create.Img}
                src={plantImage.previewURL}
                onClick={() => {
                  if (fileInput.current != null) {
                    fileInput.current.click();
                  }
                }}
              />
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

          <button
            type="button"
            className={Create.checkBtn}
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
};

export default FindPlant;
