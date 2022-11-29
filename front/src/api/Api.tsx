import axios from "axios";

const backendPortNumber = "5000";

const serverUrl = "http://localhost:" + backendPortNumber + "/";

async function get(endpoint: string, params: string | null) {
  if (params === null) {
    console.log(`GET 요청 ${serverUrl + endpoint}`);
    return axios.get(serverUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } else {
    return axios.get(serverUrl + endpoint + "/" + params, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
}

async function post(endpoint: string, data: any) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

async function put(endpoint: string, data: any) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint: string, params: string | null) {
  if (params == null) {
    console.log(`DELETE 요청 ${serverUrl + endpoint}`);
    return axios.delete(serverUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } else {
    console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
    return axios.delete(serverUrl + endpoint + "/" + params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete };

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.status === 403) {
      try {
        const res = await post("/token", null);
        if (res.status === 201) {
          const accessToken = res.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          return;
        }
      } catch (err: any) {
        console.log("로그인이 만료되었습니다.", err);
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      }
    }
    return res;
  }
);
