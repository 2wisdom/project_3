import axios, { AxiosError } from "axios";

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

async function post(endpoint: string, data: string | null) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  // let bodyData = null;
  // if (data != null) {
  const bodyData = JSON.stringify(data);
  console.log("bodyData: ", bodyData);
  // }
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

// https://github.com/axios/axios
// export interface AxiosError<T> extends Error {
//   config: AxiosRequestConfig;
//   code?: string;
//   request?: any;
//   response?: AxiosResponse<T>;
//   isAxiosError: boolean;
//   toJSON: () => object;
// }

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError) => {
    console.log("interceptors err: ", error);

    if (error.request.status === 403 && error!.response!.data == 'access token expired') {
      const originalConfig = error.config;
      // https://github.com/axios/axios/issues/5143 문제해결
      originalConfig!.headers = { ...originalConfig!.headers };
      try {
        const res = await get("token", null);
        console.log("res: ", res);
        if (res.status === 201) {
          const accessToken = res.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          //config가 null값이 아님을 알림
          originalConfig!.headers!.Authorization = `Bearer ${accessToken}`;
          return axios(originalConfig!);
        }
      } 
      catch (err: any) {
        //여기엔 뭘 작성해야할까요?
      }
    }
    else if (error.request.status === 403 && error!.response!.data == 'refresh token이 만료 되었습니다.') {
      // console.log("리프레쉬토큰 만료", error)
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear()
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  }
);
