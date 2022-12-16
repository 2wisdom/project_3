import create from "zustand";
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
}

export interface ShowCardTest {
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
  imageUrl: string;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ShowCardList {
  item: ShowCardTest[];
  docs: ShowCardTest[];
  showCardData: [ShowCardTest];
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
    const res = await Api.get("posts");
    set({ showCards: await res.data });
  },
});

export const showCardStore = create((set, get) => ({
  ...createShowCards(set, get),
}));