import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from '@/components/NavBar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Info from "./pages/InfoPage";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/" element={<Info />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/search-plant" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/market" element={<Market />} /> */}    
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;