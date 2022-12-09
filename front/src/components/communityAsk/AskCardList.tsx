import React, { useEffect } from "react";
import { useState } from "react";
import AskCard from "../card/AskCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
// import * as showCardList from "../../store/CommunityShowCard";
// import * as showCardStore from "../../store/CommunityShowCard";
import Avatar from "@mui/material/Avatar";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import imageSample from "../../../../back/public/images/leavesGetMoreYards.png";
import AskCardDetail from "@/pages/AskCardDetail";
interface AskCard {
  // map: any;
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
  errorMessage: string;
  totalPage: string;
}
const AskCardList = ({ askCardData }: { askCardData: AskCard[] }) => {
  // console.log("askCardData-askCardList", askCardData);
  return (
    <div className={CardListStyle.cardList}>
      <div className={CardListStyle.cardListInner}>
        {/* showCardData?.slice(0, visible).map((item: showCard) */}
        {askCardData &&
          askCardData?.map((item: askCard) => {
            return (
              <AskCard
                askId={item._id}
                image={item.imageUrl}
                title={item.title}
                userImage={item.author?.imageUrl}
                userName={item.author?.name}
                date={item.createdAt}
              ></AskCard>
            );
          })}
      </div>
    </div>
  );
};

export default AskCardList;
