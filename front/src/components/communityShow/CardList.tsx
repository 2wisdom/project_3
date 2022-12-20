import ShowCard from "../card/ShowCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";

interface ShowCard {
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
const CardList = ({ showCardData }: { showCardData: ShowCard[] }) => {
  return (
    <div className={CardListStyle.cardList}>
      <div className={CardListStyle.cardListInner}>

        {showCardData &&
          showCardData?.map((item: ShowCard) => {
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
