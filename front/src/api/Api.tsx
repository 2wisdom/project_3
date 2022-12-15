import axios, { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
const backendPortNumber = "5000";
// 34.64.178.176
const serverUrl = "http://localhost:" + backendPortNumber + "/";

async function get(endpoint: string, params?: string | null) {
  console.log(`GET 요청 ${serverUrl + endpoint}`);
  return axios.get(
    params ? serverUrl + endpoint + "/" + params : serverUrl + endpoint,
    {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}

async function post(endpoint: string, data: any, isFile?: boolean) {
  const bodyData = !isFile ? JSON.stringify(data) : data;
  console.log("bodyData: ", bodyData);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": !isFile ? "application/json" : "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

async function put(endpoint: string, data: any, isFile?: boolean) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = !isFile ? JSON.stringify(data) : data;
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": !isFile ? "application/json" : "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint: string, params?: string) {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(
    params ? serverUrl + endpoint + "/" + params : serverUrl + endpoint,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete };

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 403) {
      if (!error.response)
        return alert("예상치못한 토큰 오류가 발생했습니다. 재로그인해주세요.");
      if (error!.response!.data == "access token expired") {
        //토큰 재발행 요청
        const originalConfig = error.config!;
        originalConfig.headers = { ...originalConfig.headers };
        try {
          const res = await get("token");
          console.log("res: ", res);
          if (res.status === 201) {
            const accessToken = res.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            //새토큰으로 헤더 교체, null값이 아님을 알림: !
            originalConfig!.headers!.Authorization = `Bearer ${accessToken}`;
            return axios(originalConfig!);
          }
        } catch (err: any) {
          console.log("axios interceptop err", err);
        }
        if (error?.response?.data == "refresh token이 만료 되었습니다.") {
          console.log("리프레쉬토큰 만료", error);
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          return Promise.resolve(error);
        }
      }
    }
    // if (
    //   error.response?.status === 400 &&
    //   error.response.data == "로그인한 유저만 사용할 수 있는 서비스입니다."
    // ) {
    //   alert("로그인한 유저만 사용할 수 있는 서비스입니다.");
    // }
    return Promise.reject(error);
  }
);

// https://github.com/axios/axios/issues/5143 문제해결
