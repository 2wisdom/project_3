import { STATES } from "mongoose";
import { useReducer } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import * as Api from "../api/Api";

export const split = (str: string, delim: string = ""): string[] =>
  str.split(delim);

//타입설정
export interface ShowCardType {
  _Id: string;
  imageURL: string;
  imageUrl: string;
  updatedAt: string;
  userId: string;
  email: string;
  userImageURL: string;
  cardImageURL: string;
  title: string;
  date: string;
  contents: string;
  page: number;
  author: Array<string>;
  docs: Array<string>;
  pagingCounter: number;
  totalPages: number;

  //   setPostId: (value: string) => void;
  //   setUserId: (value: string) => void;
  //   setEmail: (value: string) => void;
  //   setUserImageURL: (value: string) => void;
  //   setCardImageURL: (value: string) => void;
  //   setTitle: (value: string) => void;
  //   setDate: (value: string) => void;
  //   setContents: (value: string) => void;
}

// export interface showCardTest {
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
//   limit: number;
//   nextPage: number;
//   page: number;
//   padginCounter: number;
//   prevPage: number;
//   totalDocs: number;
//   totalPages: number;
//   docs: {
//     map: any;
//     item: [
//       author: [
//         _id: string,
//         email: string,
//         imageUrl: string,
//         name: string,
//         password: string,
//         updatedAt?: string,
//         createdAt?: string
//       ],
//       _Id: string,
//       imageURL: string,
//       title: string,
//       contents: string,
//       createdAt?: string,
//       updatedAt?: string
//     ];
//   };
// }
export interface showCardTest {
  map: any;

  author: {
    _id: string;
    email: string;
    imageUrl: string;
    name: string;
    password: string;
    updatedAt?: string;
    createdAt?: string;
  };

  _id: string;
  imageURL: string;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt?: string;
}

export interface showCardList {
  item: [showCardTest];
  docs: [showCardTest];
  showCardData: [showCardTest];
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  padginCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
  length: number;
}

export const createShowCards = (set: any, get: any) => ({
  showCards: [],
  apiGetShowCards: async () => {
    const res = await Api.get("posts", null);
    set({ showCards: await res.data });
  },
});

export const showCardStore = create((set, get) => ({
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

// export default showCardStore;
