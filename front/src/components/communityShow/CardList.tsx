import React from "react";
import ShowCard from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
const CardList = ({ showCardData }: { showCardData: any }) => {
  console.log("showCardData", showCardData);
  return (
    <div className={CardListStyle.cardList}>
      {showCardData.docs &&
        showCardData.docs.map((item: any) => {
          <ShowCard
            key={item._id}
            image={item.imageUrl}
            title={item.title}
            userImage={item.author.imageUrl}
            userName={item.author.name}
            date={item.updateAt}
          ></ShowCard>;
        })}
    </div>
  );
};
// const CardList = () => {
//   return (
//     <div>
//       {/* {showCardData.map((showOff) => {
//         <Card
//           image={showOff.image}
//           title={showOff.title}
//           userImage={showOff.userImage}
//           userName={showOff.userName}
//           date={showOff.date}
//         ></Card>;
//       })} */}
//     </div>
//   );
// };

export default CardList;
