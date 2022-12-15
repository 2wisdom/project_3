import { useNavigate } from "react-router-dom";
import create from "zustand";

const navigate = useNavigate();

interface User {
    email: string;
    name: string;
    userId: string;
    imageUrl: string;
    accessToken?: string;
}

type StateProps = {
    user: User
    setUser: (user: User) => void;
    LoginToHavePermission: () => void;
}


const useUserStore = create<StateProps>((set) => ({
    user: {
        email: "",
        name: "",
        userId: "",
        imageUrl: "",
        accessToken: ""
    },
    setUser: (user) =>
        set((state) => ({
            ...state,
            user
        })),
    LoginToHavePermission: (get) => {
        const user = get(useUserStore.user)
        if (user.email == ""){
            if (confirm("로그인이 필요한 기능입니다. \n 로그인하러 가시겠습니까?")){
                navigate("/login")
            }
        }
    }
}));

// const isLoginStore = {
//     confirm("로그인이 필요한 기능입니다.</")
// }

// const isLoginStore = (set, get) => ({
//     isLogin: () =>
//       set(
//         (prev) => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }),
//         false,
//         'bear/eatFish'
//       ),
//   })

// const isLogin = () => (get) => {
//     const user = get(useUserStore.user)
// return user. 
// }

export default useUserStore;

