# 잎게모야 Back End READ ME

---

## 파일구조

📦back  
┣ 📂logs  
┣ 📂node_modules  
┣ 📂public  
┃ ┗ 📂images  
┃ ┃ ┗ 📜leavesGetMoreYards.png  
┣ 📂src  
┃ ┣ 📂config  
┃ ┃ ┗ 📜logger.js  
┃ ┣ 📂controllers  
┃ ┃ ┣ 📜CommentController.js  
┃ ┃ ┣ 📜PostController.js  
┃ ┃ ┣ 📜askController.js  
┃ ┃ ┣ 📜imageController.js  
┃ ┃ ┣ 📜marketController.js  
┃ ┃ ┣ 📜tokenController.js  
┃ ┃ ┗ 📜userAuthController.js  
┃ ┣ 📂db  
┃ ┃ ┣ 📂models  
┃ ┃ ┃ ┣ 📜Ask.js  
┃ ┃ ┃ ┣ 📜Market.js  
┃ ┃ ┃ ┣ 📜Post.js  
┃ ┃ ┃ ┣ 📜Token.js  
┃ ┃ ┃ ┗ 📜User.js  
┃ ┃ ┣ 📂schemas  
┃ ┃ ┃ ┣ 📜ask.js  
┃ ┃ ┃ ┣ 📜commnet.js  
┃ ┃ ┃ ┣ 📜image.js  
┃ ┃ ┃ ┣ 📜market.js  
┃ ┃ ┃ ┣ 📜post.js  
┃ ┃ ┃ ┣ 📜token.js  
┃ ┃ ┃ ┗ 📜user.js  
┃ ┃ ┗ 📜index.js  
┃ ┣ 📂middlewares  
┃ ┃ ┣ 📜authMiddleware.js  
┃ ┃ ┣ 📜deleteImage.js  
┃ ┃ ┣ 📜errorMiddleware.js  
┃ ┃ ┣ 📜login_required.js  
┃ ┃ ┣ 📜uploadFile.js  
┃ ┃ ┣ 📜validation.js  
┃ ┃ ┗ 📜validationSchema.js  
┃ ┣ 📂routers  
┃ ┃ ┣ 📜AskRouter.js  
┃ ┃ ┣ 📜PostRouter.js  
┃ ┃ ┣ 📜commentRouter.js  
┃ ┃ ┣ 📜imageRouter.js  
┃ ┃ ┣ 📜marketRouter.js  
┃ ┃ ┣ 📜searchRouter.js  
┃ ┃ ┣ 📜tokenRouter.js  
┃ ┃ ┗ 📜userAuthRouter.js  
┃ ┣ 📂services  
┃ ┃ ┣ 📜askService.js  
┃ ┃ ┣ 📜marketService.js  
┃ ┃ ┣ 📜postService.js  
┃ ┃ ┣ 📜tokenService.js  
┃ ┃ ┗ 📜userAuthService.js  
┃ ┣ 📜.DS_Store  
┃ ┗ 📜app.js  
┣ 📜.DS_Store  
┣ 📜.env  
┣ 📜.gitignore  
┣ 📜README.md  
┣ 📜index.js  
┣ 📜package-lock.json  
┣ 📜package.json  
┗ 📜yarn.lock

---

## .env 파일

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

---
