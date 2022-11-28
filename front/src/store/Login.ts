import { useReducer } from "react";
import create from "zustand";

interface User {
    email: string;
    name: string;
    userId: string;
    profileImg?: string;
    accessToken?: string;
}

type StateProps = {
    user: User
    setUser: (user: User) => void;
    // isLogin: boolean
    // setIsLogin: (isLogin: boolean) => void;
}

const useUserStore = create<StateProps>((set) => ({
    user: {
        email: "",
        name: "",
        userId: "",
        profileImg: "",
        accessToken: ""
    },
    setUser: (user) =>
        set((state) => ({
            ...state,
            user
        }))
    // isLogin: false
    // setIsLogin: (isLogin) =>
    //     set({isLogin: isLogin})
}));


export default useUserStore;

