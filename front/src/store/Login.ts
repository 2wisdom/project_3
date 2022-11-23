import { useReducer } from "react";
import create from "zustand";

interface User {
    email: string;
    name: string;
    userId: string;
    profileImg?: string;
}

type StateProps = {
    user: User | null
    setUser: (user: User) => void;
}

const useUserStore = create<StateProps>((set) => ({
    user: {
        email: "",
        name: "",
        userId: "",
        profileImg: ""
    },
    setUser: (user) =>
        set((state) => ({
            ...state,
            user
        }))
}));


export default useUserStore;

