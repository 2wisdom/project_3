import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/MainPage";
import MyPage from "./pages/myPage";
import useUserStore from "./store/Login";
import * as Api from "./api/Api";
import CommunityShow from "./pages/CommunityShow";
import CreateShowCard from "./pages/CreateShowCard";
import ShowCardDetail from "./pages/ShowCardDetail";
import Market from "./pages/Market";
import CreateMarketCard from "./components/market/CreateMarketCard";
import MarketCardDetail from "./components/market/MarketCardDetail";
import UserCommunityEditCard from "./components/myPage/UserPost/UserCommunityEditCard";
import UserMarketEditCard from "./components/myPage/UserPost/UserMarketEditCard";
import CommunityAsk from "./pages/CommunityAsk";
import AskCardDetail from "./pages/AskCardDetail";
import CreateAskCard from "./pages/CreateAskCard";
import FindPlant from "./pages/FindPlant";
import NotFound from "../NotFound";
const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.setUser);

  const getUser = async () => {
    try {
      const res = await Api.get("users");
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
          <Route path="/myPage/*" element={<MyPage />} />

          <Route path="/market" element={<Market />} />
          <Route path="/market/editcard/:id" element={<UserMarketEditCard />} />
          <Route
            path="/community/editcard/:id"
            element={<UserCommunityEditCard />}
          />
          <Route path="/createMarketCard" element={<CreateMarketCard />} />
          <Route path="/marketCardDetail/:id" element={<MarketCardDetail />} />

          <Route path="/findPlant" element={<FindPlant />} />

          <Route path="/communityAsk" element={<CommunityAsk />} />
          <Route path="/askCardDetail/:id" element={<AskCardDetail />}></Route>
          <Route path="/createAskCard" element={<CreateAskCard />}></Route>

          <Route path="/communityShowOff" element={<CommunityShow />} />
          <Route path="/createShowCard" element={<CreateShowCard />}></Route>
          <Route
            path="/showCardDetail/:id"
            element={<ShowCardDetail />}
          ></Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
