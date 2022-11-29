import { STATES } from "mongoose";
import { useReducer } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import * as Api from "../api/Api";
//타입설정
interface ShowCardType {
  postId: string;
  userId: string;
  email: string;
  userImageURL: string;
  cardImageURL: string;
  title: string;
  date: string;
  contents: string;

  //   setPostId: (value: string) => void;
  //   setUserId: (value: string) => void;
  //   setEmail: (value: string) => void;
  //   setUserImageURL: (value: string) => void;
  //   setCardImageURL: (value: string) => void;
  //   setTitle: (value: string) => void;
  //   setDate: (value: string) => void;
  //   setContents: (value: string) => void;
}

const createShowCards = (set: any, get: any) => ({
  showCards: [],
  apiGetShowCards: async () => {
    const res = await Api.get("posts");
    set({ showCards: await res.data });
  },
});

const showCardStore = create((set, get) => ({
  ...createShowCards(set, get),
}));
// interface ShowCardState {
//   showCard: ShowCardType | null;
//   setShowCard: (showCard: ShowCardType | null) => void;
// }

// const showCardStore = create<ShowCardState>((set) => ({
//   showCard: [
//     {
//       postId: "",
//       userId: "",
//       email: "",
//       userImageURL: "",
//       cardImageURL: "",
//       title: "",
//       date: "",
//       contents: "",
//     },
//   ],
//   setShowCard: (showCard) =>
//     set((state) => ({
//         showCard:[...state.showCard,
//             showCard]

//     })),
// }));

// const showCardStore = create<ShowCard>((set) => ({
//   postId: "",
//   userId: "",
//   email: "",
//   userImageURL: "",
//   cardImageURL: "",
//   title: "",
//   date: "",
//   contents: "",
//   setPostId: (postId) => set({ postId }),
//   setUserId: (userId) => set({ userId }),
//   setEmail: (email) => set({ email }),
//   setUserImageURL: (userImageURL) => set({ userImageURL }),
//   setCardImageURL: (cardImageURL) => set({ cardImageURL }),
//   setTitle: (title) => set({ title }),
//   setDate: (date) => set({ date }),
//   setContents: (contents) => set({ contents }),
// }));
// const showCardStore = create<ShowCardState>((set) => ({
//     //initial state
//     showCards:[],
//     //methods for manipulating state
//     addShowCard:(showCard) =>
//     set((state) => ({
//         showCards: [
//             ...state.showCards,{
//                 postId:state.postId,
//                 userId,
//                 email,
//                 userImageURL,
//                 cardImageURL,
//                 title,
//                 date,
//                 contents,
//             } as ShowCard,
//         ],
//     }));
// }))

// type StateProps = {
//   showCard: ShowCard | null;
//   setShowCard: (showCard: ShowCard | null) => void;
// };
// const showCardStore = create<ShowCardState>((set) => ({
//   showCard: {
//     postId: "",
//     userId: "",
//     email: "",
//     userImageURL: "",
//     cardImageURL: "",
//     title: "",
//     date: "",
//     contents: "",
//   },
//   const apiRes = Api.get("posts");
//   setShowCard: (showCard) =>
//     set((state) => ({
//       ...state,
//       showCard:apiRes.data
//     })),
// }));
// const showCardStore = create<ShowCardState>(set => ({
//     showCards:[],
//     addShowCard: showCard => set(state => ({showCards: [...state.showCards, showCard]})),

// }));

export default showCardStore;
