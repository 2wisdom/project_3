import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/MainPage";
import useUserStore from "./store/Login";
import CommuityShowOff from "./pages/CommunityShowOff";
import * as Api from "./api/Api";

const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  //여기서 로그인중이면 localstorage의 토큰만 보내서 유저정보 받아옴
  useEffect(() => {
    Api.get("users", null).then((res) => setUser(res.data));
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/communityShowOff" element={<CommuityShowOff />} />
          {/* <Route path="/search-plant" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/market" element={<Market />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
