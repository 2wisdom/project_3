import { useReducer } from "react";
import create from "zustand";

interface User {
    email: string;
    name: string;
    userId: string;
    profileImg?: string;
    token?: string;
}

type StateProps = {
    user: User | null
    setUser: (user: User | null) => void;
}

const useUserStore = create<StateProps>((set) => ({
    user: {
        email: "",
        name: "",
        userId: "",
        profileImg: "",
        token: ""
    },
    setUser: (user) =>
        set((state) => ({
            ...state,
            user
        }))
}));


export default useUserStore;

