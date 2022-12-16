import React, { useRef, useState } from "react";
import Find from "../styles/findPlant/FindPlant.module.css";
import uploadImg from "../../assets/findPlant/upload.png";
import axios from "axios";

const FindPlant = () => {
  const [lensImage, setLensImage] = useState<File | any>(null);
  const formData = new FormData();
  const [isFind, setIsFind] = useState<boolean>(false);
  const [plantImage, setPlantImage] = useState<File | null>(null);
  const [plantName, setPlantName] = useState<String>("");
  const [predictionRate, setPredictionRate] = useState<String>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLensImage(e.target.files[0]);

    setPlantImage(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
    console.log(`확인확인확인확인:`, formData.get("image"));
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    console.log("click");
    setIsFind(true);
    try {
      formData.append("image", lensImage);
      let res = await axios({
        method: "post",
        url: "http://34.64.178.176:5000/lens",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPlantName(res.data.plantName);
      setPredictionRate(res.data.predictionRate);
      console.log("res.data.plantName", res.data.plantName);
      console.log("res.data.predictionRate", res.data.predictionRate);
    } catch (err) {
      console.log("imageErr", err);
    }
  };
  console.log("formdata", formData.get("image"));
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
        <div className={Find.resultInner}>
          {isFind ? (
            <p className={Find.result}>
              <div className={Find.plantName}>
                식물이름 : <p className={Find.fontColor}>{plantName}</p>
              </div>
              <div className={Find.predictionRate}>
                예측률 : <p className={Find.fontColor}>{predictionRate}</p>
              </div>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FindPlant;
