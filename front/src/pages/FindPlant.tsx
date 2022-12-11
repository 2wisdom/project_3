import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Find from "../styles/findPlant/FindPlant.module.css";
import uploadImg from "../../assets/findPlant/upload.png";
import * as Api from "../api/Api";
import axios from "axios";
interface FindPlantData {
  imageFile: string;
  previewURL: string;
}
const FindPlant = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const [plantImage, setPlantImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    formData.append("image", e.target.files[0]);
    setPlantImage(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log("click");
    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:5000/lens",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("res-test", res);
    } catch (err) {
      console.log("imageErr", err);
    }
  };
  // http://localhost:5000/images/image-upload
  return (
    <div className={Find.container}>
      <div className={Find.Inner}>
        <p className={Find.title}>식물찾기</p>
        <div className={Find.imgInner}>
          <img
            className={Find.Img}
            src={
              plantImage === null ? uploadImg : URL.createObjectURL(plantImage)
            }
            onClick={handleClick}
          />
          <form
            name="findPlantImage"
            encType="multipart/form-data"
            accept-charset="UTF-8"
          ></form>
          <input
            type="file"
            name="file"
            style={{ opacity: "0" }}
            accept="image/jpg, image/png, image/jpeg"
            onChange={onChangeImage}
            ref={fileRef}
          ></input>
        </div>

        <button type="submit" className={Find.checkBtn} onClick={handleSubmit}>
          식물찾기
        </button>
      </div>
    </div>
  );
};

export default FindPlant;
