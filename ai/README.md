# 인공지능 FastAPI 서버

</br>

## 요구사항

- Python 3.7 이상
- VScode의 오른쪽 extensions 탭에서 python 검색 후 Microsoft에서 제공하는 python을 설치

</br>

## 설치

- 패키지 설치 및 서버 실행

  ```
  cd ai
  pip install --upgrade pip
  pip install -r requirements.txt
  ./run.sh
  ```

</br>

- 인공지능 모델 다운로드

  - [PlantNet Pre-trained model Download](https://lab.plantnet.org/seafile/d/01ab6658dad6447c95ae/files/?p=%2Fresnet18_weights_best_acc.tar)
  - 위의 링크에서 식물 이미지 분류 AI 모델(약 90MB)을 다운로드 후 team12 > ai > model 폴더에 저장 (FileZilla와 같은 파일 전송 소프트웨어 사용 추천)

</br>

- 참고

  - python 버전 확인 ▶ `python --version 또는 python3 --version`

  - 설치된 패키지 목록 확인 ▶ `pip list`

</br>

## FastAPI 서버 실행 옵션

- 개발환경 `uvicorn main-server:app --reload`
- 배포환경 `uvicorn main-server:app`

|    내용     |                     기능                     |
| :---------: | :------------------------------------------: |
| main-server |   main-server.py 파일 이름 (파이썬 "모듈")   |
|     app     | main-server.py 파일안의 app = FastAPI() 객체 |
|  --reload   | 변경된 코드 적용후 재시작, 개발환경에서 사용 |

</br>

## 기술 스택

- Python, Tensorflow, Pytorch, FastAPI

</br>

## 인공지능 학습 데이터

- Pl@ntNet-300K image dataset: https://zenodo.org/record/5645731#.Y5mEy3ZByUn

- Meta-data files: plantnet300K_kor_name.csv (팀원들과 학술명을 한글명으로 공동 작업)

- Pre-trained model: resnet18_weights_best_acc.tar
