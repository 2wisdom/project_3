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
}));

export default useUserStore;

