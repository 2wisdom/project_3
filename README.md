# Project 잎게뭐야 <img src="https://user-images.githubusercontent.com/108377377/206446203-a1373fee-328b-4f8c-ac9d-1e3cd31e8e94.png" width="25" height="25"/>

<br>

## 프로젝트 소개

---

이미지로 식물 예측이 가능한 온라인 커뮤니티 웹 사이트입니다.

<br>

## 주요 기능

---

1. 식물 이미지를 import 하여 식물 이름과 예측 정확도(%)를 얻을 수 있습니다.
2. 이용자 간의 소통을 위한 질문 게시판과 자랑 게시판을 제공합니다.
3. 식물 관련 상품 거래를 위한 판매 게시판을 제공합니다.

<br>

## 사용 방법

---

```
cd front
yarn
yarn dev
```

```
cd back
yarn
yarn start
```

```
cd ai
pip install --upgrade pip
pip3 install python==3.7.6
pip3 install fastapi
pip3 install "uvicorn[standard]"
pip3 install pydantic
pip3 install pandas
pip3 install pillow
pip3 install torch torchvision torchaudio
uvicorn main-server:app --reload
```

<br>

## 개발 기간

---

2022년 11월 14일 ~ 2022년 12월 16일

<br>

## 팀 소개

---

- 이지혜
- 김성우: https://github.com/working-zima
- 박은정
- 이홍준
- 조하은

<br>

## 주요 기술

---

| FE                                                                                                                        | BE                                                                                                            | AI                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>             | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> | <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">          |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/>                       | <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>     | <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white"/> |
| <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/> | <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>       | <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white"/>       |
| <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white"/>                          | <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>       | <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>       |

<br>

## 외부 리소스

---

### pl@ntNet Lab

https://lab.plantnet.org/seafile/d/01ab6658dad6447c95ae/files/?p=%2Fresnet18_weights_best_acc.tar

<br>

## 기타

---

자세한 사항은 각 폴더별 README 를 참고해주세요.
