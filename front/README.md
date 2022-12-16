yarn dev: 로컬 실행용 (localhost8081)
yarn build: 개발서버 배포용

### 기술스택

- TypeScript
- React
- StyleComponent
- Module.css
- webpack5
- Zustand

### 파일트리

📦front
┣ 📂config
┃ ┣ 📜webpack.common.js
┃ ┣ 📜webpack.dev.js
┃ ┗ 📜webpack.prod.js
┣ 📂dist
┣ 📂node_modules
┣ 📂public
┃ ┗ 📜index.html
┣ 📂src
┃ ┣ 📂components
┃ ┃ ┗ 📂button
┃ ┃ ┗ 📂card
┃ ┃ ┗ 📂comment
┃ ┃ ┗ 📂communityAsk
┃ ┃ ┗ 📂communityShow
┃ ┃ ┗ 📂market
┃ ┃ ┗ 📂mypage
┃ ┃ ┗ search  
┃ ┃ ┗ 📜NavBar.tsx
┃ ┣ 📂pages
┃ ┣ 📂store
┃ ┣ 📂styles
┃ ┣ 📜App.tsx
┃ ┗ 📜index.tsx
┣ 📜.babelrc
┣ 📜package.json
┣ 📜README.md
┣ 📜tsconfig.json
┗ 📜yarn.lock

### 실행

1. front 폴더에서 yarn 설치

```
npm intall yarn
```

2.라이브러리 설치

```
yarn
```

3.웹팩실행

```
yarn dev
```

### 주요기능

- 로그인/회원가입
- 식물찾기(사진업로드시 식물이름과 예측률을 알려줌)
- 자랑하기 crud/댓글&대댓글
- 질문하기 crud/댓글&대댓글
- 마켓 crud/댓글&대댓글
- 마이페이지
- 개인정보 수정,삭제/프로필 사진 변경
- 내가 쓴 글 불러오기,수정,삭제
- 내가 쓴 댓글 불러오기,삭제
