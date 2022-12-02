import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/MainPage";
import myPage from "./pages/myPage";
import useUserStore from "./store/Login";
import * as Api from "./api/Api";
import CommuityShow from "./pages/CommunityShow";
import CreateShowCard from "./pages/CreateShowCard";
const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  //여기서 로그인중이면 localstorage의 토큰만 보내서 유저정보 받아옴
  // useEffect(() => {
  //   Api.get("users", null)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setUser(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err)}
  //       // if (err.status === 400) {
  //       //   console.log("구경꾼");
  //       // }
  //     );
  // }, []);

  const getUser = async () => {
    try {
      const res = await Api.get("users", null);
      console.log(res.config);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        console.log("구경꾼이다");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/communityShowOff" element={<CommuityShow />} />
          {/* <Route path="/search-plant" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/market" element={<Market />} /> */}
          <Route path="/createShowCard" element={<CreateShowCard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
