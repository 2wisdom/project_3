yarn dev: 로컬 실행용 (localhost8081)
yarn build: 개발서버 배포용

### 기술스택

- TypeScript
- React
- StyleComponent
- CSS
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
 ┃ ┃ ┗ 📜login.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📜.babelrc
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock