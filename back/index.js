require("dotenv").config();

// src/db/index.js 실행
require("./src/db/index");
// src/app.js 실행
const { app } = require("./src/app");

const PORT = process.env.SERVER_PORT || 5000;

// 서버 연결
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
