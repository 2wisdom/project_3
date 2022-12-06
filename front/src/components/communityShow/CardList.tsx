import React, { useEffect } from "react";
import { useState } from "react";
import ShowCard from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
// import * as showCardList from "../../store/CommunityShowCard";
// import * as showCardStore from "../../store/CommunityShowCard";
import Avatar from "@mui/material/Avatar";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import imageSample from "../../../../back/public/images/leavesGetMoreYards.png";
import ShowCardDetail from "@/pages/ShowCardDetail";
interface showCard {
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
}
const CardList = ({ showCardData }: { showCardData: showCard[] }) => {
  const [visible, setVisible] = useState(8);

  return (
    <div className={CardListStyle.cardList}>
      <div className={CardListStyle.cardListInner}>
        {/* showCardData?.slice(0, visible).map((item: showCard) */}
        {showCardData &&
          showCardData?.map((item: showCard) => {
            return (
              <ShowCard
                postId={item._id}
                image={item.imageUrl}
                title={item.title}
                userImage={item.author?.imageUrl}
                userName={item.author?.name}
                date={item.createdAt}
              ></ShowCard>
            );
          })}
      </div>
    </div>
  );
};

export default CardList;
