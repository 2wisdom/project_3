import React from "react";
import { useState } from "react";
import ShowCard from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
// import * as showCardList from "../../store/CommunityShowCard";
import * as showCardStore from "../../store/CommunityShowCard";
import Avatar from "@mui/material/Avatar";
import Card from "../../styles/showOffPage/ShowCard.module.css";
import imageSample from "../../../../back/public/images/leavesGetMoreYards.png";
const CardList = ({
  showCardData,
}: {
  showCardData: showCardStore.showCardList;
}) => {
  const [visible, setVisible] = useState(8);
  // console.log("showCArdData", showCardData.docs && showCardData.docs.length);
  return (
    <div className={CardListStyle.cardList}>
      <div className={CardListStyle.cardListInner}>
        {showCardData.docs &&
          showCardData.docs
            ?.slice(0, visible)
            .map((item: showCardStore.showCardTest) => {
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
