import AskCard from "../card/AskCard";
import CardListStyle from "../../styles/showOffPage/CardList.module.css";

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
  return (
    <div className={CardListStyle.cardList}>
      <div className={CardListStyle.cardListInner}>
        {askCardData &&
          askCardData?.map((item: AskCard) => {
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
