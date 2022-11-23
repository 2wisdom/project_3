import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./components/Login"
import Register from "./components/Register"
import Info from "./pages/InfoPageMain"
import Main from "./pages/MainPage"
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Main />} />
                    {/* <Route path="/" element={<Info />} /> */}
                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> */}
                    {/* <Route path="/search-plant" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/market" element={<Market />} /> */}    
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;