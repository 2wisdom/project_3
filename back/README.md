# 잎게모야 Back End READ ME

<br><br>

## 환경 변수 설정

1. back 폴더 아래 .env 파일 생성
2. .env 파일에서 아래의 환경변수 설정

<br>

- 배포시 'production', 개발시 'dev'

```
NODE_ENV='production'
```

- 포트번호

```
SERVER_PORT=5000
```

- 몽고디비 Atlas 서버 예시  
  (name과 password를 본인의 것으로 변경하여 사용)

```
MONGODB_URL='mongodb+srv://<name>:<password>@cluster0.8akjhnw.mongodb.net/?retryWrites=true&w=majority'
```

- jwt 암호키 예시

```
JWT_SECRET_KEY="JWT VERIFY SIGNATURE"
```

- 암호화 레벨 예시 (높을 수록 높은 암호화)

```
SALT_ROUND=12
```

- 엑세스 토큰 유효기간 예시 ('30m'은 30분 후 만료를 의미)

```
ACCESS_EXPIRES_IN='30m'
```

- 리프레쉬 토큰 유효기간 예시 ('14d'는 14일 후 만료를 의미)

```
REFRESH_EXPIRES_IN='14d'
```

- 유저 기본 이미지 이름  
  (이미지 변경을 원할시 team12/back/public/images 폴더 내의 leavesGetMoreYards.png 를 변경)

```
DEFAULT_IMAGE_NAME="leavesGetMoreYards.png"
```

- 유저 기본 이미지 URL

```
DEFAULT_IMAGE_URL="public/images/leavesGetMoreYards.png"
```

- 페이지 당 게시물 개수

```
PAGE_LIMIT_COUNT=6
```

- AI 서버 포트

```
AI_SERVER_PORT=8000
```

<br><br>

## MongoDB

### Atlas 서버 구축

1. MongoDB Atlas가입
   홈페이지(https://www.mongodb.com/home)
2. 무료 클러스터 생성 (512MB)
3. SECURITY의 Database Access -> Add New User -> name, password 설정
4. SECURITY 의 Network Access -> Add IP Address -> current IP 등록
5. DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사

### 공식문서

https://docs.mongodb.com/manual/tutorial/getting-started/

<br><br>

## Express

### 서버 실행

1. back 폴더에서 yarn 설치

```
npm intall yarn
```

2. 라이브러리 설치

```
yarn
```

3. 백엔드 서버 실행

```
yarn start
```

<br><br>

## 파일구조

📦back  
┣ 📂logs  
┣ 📂node_modules  
┣ 📂public  
┃ ┗ 📂images  
┣ 📂src  
┃ ┣ 📂config  
┃ ┣ 📂controllers  
┃ ┣ 📂db  
┃ ┃ ┣ 📂models  
┃ ┃ ┣ 📂schemas  
┃ ┃ ┗ 📜index.js  
┃ ┣ 📂middlewares  
┃ ┣ 📂routers  
┃ ┣ 📂services  
┃ ┗ 📜app.js  
┣ 📜.env  
┣ 📜.gitignore  
┣ 📜README.md  
┣ 📜index.js  
┣ 📜package-lock.json  
┣ 📜package.json  
┗ 📜yarn.lock

<br><br>
