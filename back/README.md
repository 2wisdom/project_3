# 잎게모야 Back End READ ME

## 파일구조

---

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

<br>

## 환경 변수

---

- 배포시 'production', 개발시 'dev'

```
NODE_ENV='production
```

- 포트

```
SERVER_PORT=포트번호
```

- 몽고디비

```
MONGODB_URL='몽고디비 URL'
```

- jwt

```
JWT_SECRET_KEY="JWT VERIFY SIGNATURE"
```

- 암호화 레벨

```
SALT_ROUND=숫자
```

- 엑세스 토큰 유효기간

```
ACCESS_EXPIRES_IN=''
```

- 리프레쉬 토큰 유효기간

```
REFRESH_EXPIRES_IN=''
```

- 유저 기본 이미지 이름

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

<br>
