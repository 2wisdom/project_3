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
    user: User | null
    setUser: (user: User | null) => void;
    isLogin: boolean
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
        })),
    isLogin: false
}));


export default useUserStore;

