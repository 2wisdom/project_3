import React from "react";
import Card from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";
const CardList = ({ showCardData }: { showCardData: any }) => {
  return (
    <div className={CardListStyle.cardList}>
      {showCardData.docs &&
        showCardData.docs.map((item: any) => {
          <Card
          // image={CardListStyle.image}
          // title={CardListStyle.title}
          // userImage={CardListStyle.userImage}
          // userName={CardListStyle.userName}
          // date={CardListStyle.date}
          ></Card>;
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
