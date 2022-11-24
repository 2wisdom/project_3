import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from '@/components/NavBar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/MainPage";
import CommuityShowOff from "./pages/CommunityShowOff";
const App = () => {
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
    )
}
export default App;