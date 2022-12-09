import create from "zustand";

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
    // setUserClear: () => void;
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
        }))
    // setUserClear: () => set({user : {email: "",
    // name: "",
    // userId: "",
    // imageUrl: "",
    // accessToken: ""}})
}));

export default useUserStore;

