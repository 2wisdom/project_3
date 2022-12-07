from fastapi import FastAPI, File
from pydantic import BaseModel
# from starlette.responses import FileResponse

app = FastAPI()


class Data(BaseModel):
    imageUrl: str


@app.get("/")
async def root():

    return {"Message": "잎게모야"}


@app.post("/prediction")
async def prediction(data: Data):
    FileResponse(f'{IMG_DIR}/{data.imgUrl}')
    response = FileResponse("public/images/leavesGetMoreYards.png")

    return data


# uvicorn main:app --reload
# "public/images/leavesGetMoreYards.png"
