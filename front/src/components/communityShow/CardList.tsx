import React from "react";
import ShowCard from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
// import * as showCardList from "../../store/CommunityShowCard";
import * as showCardStore from "../../store/CommunityShowCard";
import Avatar from "@mui/material/Avatar";
import Card from "../../styles/showOffPage/ShowCard.module.css";

const CardList = ({ showCardData }: { showCardData: any }) => {
  return (
    <div className={CardListStyle.cardList}>
      {showCardData &&
        showCardData.docs?.map((item: showCardStore.showCardTest) => {
          <ShowCard
            key={item._id}
            image={item.imageURL}
            title={item.title}
            userImage={item.author.imageUrl}
            userName={item.author.name}
            date={item.createdAt}
          ></ShowCard>;
        })}
    </div>
  );
};

export default CardList;
