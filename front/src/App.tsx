import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/MainPage";
import MyPage from "./pages/myPage";
import useUserStore from "./store/Login";
import * as Api from "./api/Api";
import CommuityShow from "./pages/CommunityShow";
import CreateShowCard from "./pages/CreateShowCard";
import ShowCardDetail from "./pages/ShowCardDetail";
const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.setUser);

  const getUser = async () => {
    try {
      const res = await Api.get("users", null);
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
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myPage" element={<MyPage />} />

          <Route path="/communityShowOff" element={<CommuityShow />} />
          {/* <Route path="/search-plant" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/market" element={<Market />} /> */}
          <Route path="/createShowCard" element={<CreateShowCard />}></Route>
          <Route
            path="/showCardDetail/:id"
            element={<ShowCardDetail />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
