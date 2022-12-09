import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
import ShowCard from "../components/market/showCard";
import CardListStyle from "../styles/showOffPage/CardList.module.css";
import showCard from "../components/market/showCard";

interface author {
  imageUrl: string;
  name: string;
  _id: string;
}

interface showCard {
  author: author;
  contents: string;
  createdAt: string;
  imageUrl: string;
  title: string;
  updatedAt: string;
  price: number;
  _id: string;
  category: string;
  // isSoldOut: boolean;
}

const Market = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [showCards, setShowCards] = useState<showCard[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [pickedCategory, setPickedCategory] = useState<string | null>(null);
  const isShowAll = pickedCategory === null;
  const categoryList = ["구근/뿌리묘/모종", "모종(산내들농장)", "씨앗", "기타"];
  const apiGetShowCardData = async () => {
    try {
      const res = isShowAll
        ? await Api.get("markets?page=1&limit=8", null)
        : await Api.get(
            "markets",
            `categorys?page=1&limit=8&category=${pickedCategory}`
          );

      setShowCards(res.data.docs);
      setHasNextPage(res.data.hasNextPage);
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(showCards)
  useEffect(() => {
    apiGetShowCardData();
  }, [pickedCategory]);

  const loadMoreCards: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = isShowAll
        ? await Api.get(`markets?page=${page}&limit=8`, null)
        : await Api.get(
            "markets",
            `categorys?page=${page}&limit=8&category=${pickedCategory}`
          );
      setShowCards([...showCards, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(page + 1);
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };

  return (
    <>
      <div className={Show.container}>
        <div className={Show.Inner}>
          <div className={Show.rightInner}>
            <div className={Show.titleNavInner}>
              <h2 className={Show.title}>식물마켓</h2>
              <ul className={Show.navContainer}>
                {categoryList.map((category) => {
                  return (
                    <li
                      className={
                        pickedCategory === category
                        ? `${Show.navItem} ${Show.clickedNav}`
                      : Show.navItem}
                      value={category}
                      key={category}
                      onClick={(e) => {
                        setPage(1);
                        pickedCategory === category
                          ? setPickedCategory(null)
                          : setPickedCategory(category);
                      }}
                    >
                      {category}
                    </li>
                  );
                })}
                {/* <Search></Search> */}
              </ul>
            </div>
            <div className={Show.cardInner}>
              <div className={CardListStyle.cardList}>
                <div className={CardListStyle.cardListInner}>
                  {showCards.map((showcard) => {
                    return (
                      <ShowCard
                        key={showcard._id}
                        _id={showcard._id}
                        imageUrl={showcard.imageUrl}
                        title={showcard.title}
                        authorName={showcard.author.name}
                        authorImageUrl={showcard.author.imageUrl}
                        date={showcard.createdAt}
                        contents={showcard.contents}
                        price={showcard.price}
                        category={showcard.category}
                        // isSoldOut={true}
                      />
                    );
                  })}
                </div>
                <div className={Show.footer}>
                  <div className={Show.moreBtnInner}>
                    {hasNextPage && (
                      <button
                        className={Show.moreBtn}
                        onClick={loadMoreCards}
                      >
                        더보기
                      </button>
                    )}
                  </div>
              <div className={Show.writeBtnInner}>
                <EditIcon
                  className={Show.writeBtnOutline}
                  sx={{ fontSize: 30 }}
                  onClick={() => {
                    navigate("/createMarketCard");
                  }}
                ></EditIcon>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
