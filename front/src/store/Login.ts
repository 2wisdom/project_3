import create from "zustand";

interface User {
    email: string;
    setEmail: (email: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    password: string;
    setPassword: (password: string) => void;
    profileImg?: string;
    setProfileImg: (profileImg: string) => void;
}

interface User2 {
    email: string;
    nickname: string;
    password: string;
    profileImg?: string
    setUser: (
        email: string,
        nickname: string,
        password: string,
        profileImg?: string) => void;
}


{

}
const userStore = create<User>((set) => ({
    email: "",
    setEmail: (email) =>
        set((state) => ({
            ...state,
            email
        })),

    nickname: "",
    setNickname: (nickname) =>
        set((state) => ({
            ...state,
            nickname
        })),

    password: "",
    setPassword: (password) =>
        set((state) => ({
            ...state,
            password
        })),

    profileImg: "",
    setProfileImg: (profileImg) =>
        set((state) => ({
            ...state,
            profileImg
        }))
}));

export default userStore;

// const userStore = create((set) => ({
//   id: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))