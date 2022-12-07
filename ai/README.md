## bㅠ

# FastAPI 인공지능 서버

## 요구사항

- Python 3.7 이상

## 설치

- 설치된 파이썬 패키지 리스트 확인하고 설치하기 -> 터미널에서 pip list 입력

- 이미 설치된 python 유무 확인하기 -> 터미널에서 python --version 입력

- pip3 install python

- pip3 install fastapi

- pip3 install "uvicorn[standard]"

- pip3 install pydantic

- pip3 install torch torchvision torchaudio (cpu only version 설치)

- pip install pandas

## 실행

- uvicorn main:app --reload

  명령 uvicorn main:app --reload 은 다음을 나타냅니다: </br>
  main: main.py 파일 (파이썬 "모듈"). </br>
  app: the object created inside of main.py with the line app = FastAPI(). </br>
  --reload: 코드가 변경된 후 서버 재시작하기. 개발환경에서만 사용하십시오. </br>
