# FastAPI 인공지능 서버

## 요구사항

- Python 3.7 이상

</br>

## 설치

- 설치해야 할 패키지 목록

  - pip install --upgrade pip
  - pip3 install python==3.7.6
  - pip3 install fastapi
  - pip3 install "uvicorn[standard]"
  - pip3 install pydantic
  - pip3 install pandas
  - pip3 install pillow
  - pip3 install torch torchvision torchaudio

- 인공지능 모델

  - https://lab.plantnet.org/seafile/d/01ab6658dad6447c95ae/files/?p=%2Fresnet18_weights_best_acc.tar
  - 위의 URL에서 식물 이미지 분류 AI 모델(약 90MB)을 다운로드 후 team12 > ai > model 폴더에 저장

- 참고

  - python 버전 확인 ➡ python --version
  - 설치된 패키지 목록 확인 ➡ pip list </br>

</br>

## 서버 실행

- `./run.sh`
- `uvicorn main-server:app --reload`

|    내용     |                     기능                     |
| :---------: | :------------------------------------------: |
| main-server |   main-server.py 파일 이름 (파이썬 "모듈")   |
|     app     | main-server.py 파일안의 app = FastAPI() 객체 |
|  --reload   | 변경된 코드 적용후 재시작, 개발환경에서 사용 |

## 기술 스택

- Python, Tensorflow, Pytorch, FastAPI
