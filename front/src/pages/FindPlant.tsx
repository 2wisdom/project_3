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
  const [plantImage, setPlantImage] = useState<FindPlantData>({
    imageFile: "",
    previewURL: uploadImg,
  });
  const fileInput = useRef<HTMLInputElement>(null);

  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (e.target != null) {
          // setPlantImage({
          //   imageFile: e.target.files[0],
          //   previewURL: reader.result,
          // })
        }
      }
    };
    // formData.append("image", e.target.files[0] as any);
    // try {
    //   const res = await axios({
    //     method: "post",
    //     url: "http://localhost:5000/lens",
    //     data: formData,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   });
    //   const result = res.data.url;
    //   setPlantImage((prev) => ({
    //     ...prev,
    //     imageFile: result,
    //   }));
    // } catch (err) {
    //   console.log("imageErr", err);
    //   alert(" 오류가 발생했습니다. 다시 시도해주세요");
    // }
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
      <div className={Find.container}>
        <div className={Find.Inner}>
          <p className={Find.title}>식물찾기</p>
          <div className={Find.imgInner}>
            <form
              name="findPlant"
              encType="multipart/form-data"
              accept-charset="UTF-8"
            >
              <img
                className={Find.Img}
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
              name="findPlant"
              multiple
              onChange={onChangeImage}
              ref={fileInput}
            ></input>
          </div>

          <button
            type="button"
            className={Find.checkBtn}
            onClick={handleSubmit}
          >
            식물찾기
          </button>
        </div>
      </div>
    </form>
  );
};

export default FindPlant;
