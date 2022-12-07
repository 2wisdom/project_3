from fastapi import FastAPI, File, UploadFile, status
from pydantic import BaseModel, Field
from fastapi.responses import FileResponse
from starlette.responses import JSONResponse
import uvicorn
import asyncio
import os
import io
import numpy as np
import pandas as pd
import torch
import torchvision
from torchvision import transforms
import torch.nn.functional as F
from PIL import Image

app = FastAPI()


@app.get("/")
async def root():
    return {"Message": "잎게모야"}


class Data(BaseModel):
    imageUrl: str = Field(title="백엔드 서버내의 이미지 위치 경로")


# AI 모델 불러오기
model = torchvision.models.resnet18(num_classes=1081)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
d = torch.load('./model/resnet18_weights_best_acc.tar', map_location=device)
model.load_state_dict(d['model'])
model = model.eval()


# 학습에 적합한 형태로 데이터 리사이즈, 텐서로 변환, 정규화
def transform_image(req_img):
    transform_pred = transforms.Compose(
        [
            transforms.Resize(size=224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[
                0.229, 0.224, 0.225])
        ]
    )

    image = Image.open(req_img).convert("RGB")
    req_img = transform_pred(image).unsqueeze(0)
    return req_img


# AI 모델을 통해 이미지를 추론하고 이름과 확률을 출력
async def get_prediction(req_img):
    with torch.no_grad():
        tensor = transform_image(req_img)
        result = model(tensor)
        proba = F.softmax(result)
        # print(proba)
        max_proba = torch.max(proba).item()
        probability = f"{max_proba * 100:.2f}" + "%"
        label = torch.argmax(result, dim=-1).item()
        # print(label)
        df_meta_id_name = pd.read_csv(
            './data/metadata/plantnet300K_species_id_2_name.csv')
        name = df_meta_id_name.loc[label]["name"]

    return name, probability


# 백엔드로부터 요청 이미지 URL을 받음
@app.post("/predict", name="이미지 URL 받기")
async def predict(req_img: Data):

    imgUrl = "'" + f"{req_img.imageUrl}" + "'"

    print("hello world", imgUrl)
    # url = "http://localhost:5000/back"
    # img = "public/images/leavesGetMoreYards.png"
    # req_img = os.path.join(url, img)
    # req_img = "../data/sample/1.jpg"
    name, probability = await get_prediction(imgUrl)
    return JSONResponse({"plantName": name, "predictionRate": probability})


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
