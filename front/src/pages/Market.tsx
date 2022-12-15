import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import MarketStyle from "../styles/market/Market.module.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
import MarketCard from "../components/market/MarketCard";
import CardListStyle from "../styles/showOffPage/CardList.module.css";
import useDebounce from "@/useDebounce";
interface Author {
  imageUrl: string;
  name: string;
  _id: string;
}

interface ShowCard {
  author: Author;
  contents: string;
  createdAt: string;
  imageUrl: string;
  title: string;
  updatedAt: string;
  price: number;
  _id: string;
  category: string;
  isSoldOut: boolean;
  errorMessage: string;
  totalPage: string;
}

const Market = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [marketCards, setMarketCards] = useState<ShowCard[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [pickedCategory, setPickedCategory] = useState<string | null>(null);
  const isShowAll = pickedCategory === null;
  const categoryList = ["구근/뿌리묘/모종", "다육식물", "씨앗", "기타"];

  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);
  const [searchData, setSearchData] = useState<ShowCard[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = searchPage === totalPage;
  console.log(marketCards);
  const apiGetShowCardData = async () => {
    try {
      const res = isShowAll
        ? await Api.get("markets?page=1&limit=8")
        : await Api.get(`markets?page=1&limit=8&category=${pickedCategory}`);

      setMarketCards(res.data.docs);
      setHasNextPage(res.data.hasNextPage);
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };

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
        : await Api.get(`markets?page=1&limit=8&category=${pickedCategory}`);

      setMarketCards([...marketCards, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(page + 1);
    } catch (err) {
      console.log("더보기 에러: ", err);
    }
  };

  //검색구현함수
  useEffect(() => {
    const getSearchCards = async () => {
      return await Api.get(
        `search/markets?option=all&question=${debounceValue}&page=${searchPage}`,
        null
      )
        .then((res) => {
          setSearchData(res.data.searchedMarkets);
          setTotalPage(res.data.totalPage);
          console.log("res.data.searchedPosts", res.data);
          setIsSearch(true);
          setSearchPage(searchPage + 1);
        })
        .catch((err) => {
          console.log("getSearchCards Err", err);
        });
    };
    if (debounceValue) {
      getSearchCards();
    } else if (!debounceValue) {
      setIsSearch(false);
      setSearchPage(1);
    }
  }, [debounceValue]);
  const searchMoreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    Api.get(
      `search/markets?option=all&question=${debounceValue}&page=${searchPage}`,
      null
    ).then((res) => {
      setSearchData([...searchData, ...res.data.searchedMarkets]);
      setSearchPage(searchPage + 1);
    });
    if (!debounceValue) {
      setIsSearch(false);
      setSearchPage(1);
    }
  };
  return (
    <div className={MarketStyle.container}>
      <div className={MarketStyle.titleSearchInner}>
        <h2 className={MarketStyle.title}>식물마켓</h2>
        <ul className={MarketStyle.navContainer}>
          {categoryList.map((category) => {
            return (
              <li
                className={
                  pickedCategory === category
                    ? `${MarketStyle.navItem} ${MarketStyle.clickedNav}`
                    : MarketStyle.navItem
                }
                value={category}
                key={category}
                onClick={(e) => {
                  setPage(1);
                  setIsSearch(false);
                  setSearchPage(1);
                  pickedCategory === category
                    ? setPickedCategory(null)
                    : setPickedCategory(category);
                }}
              >
                {category}
              </li>
            );
          })}
        </ul>

        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>

      <div className={MarketStyle.cardInner}>
        <div className={CardListStyle.cardList}>
          <div className={CardListStyle.cardListInner}>
            {isSearch
              ? searchData?.map((marketCard) => (
                  <MarketCard
                    key={marketCard._id}
                    _id={marketCard._id}
                    imageUrl={marketCard.imageUrl}
                    title={marketCard.title}
                    authorName={marketCard.author.name}
                    authorImageUrl={marketCard.author.imageUrl}
                    date={marketCard.createdAt}
                    contents={marketCard.contents}
                    price={marketCard.price}
                    category={marketCard.category}
                    isSoldOut={marketCard.isSoldOut}
                  />
                ))
              : marketCards.map((marketCard) => (
                  <MarketCard
                    key={marketCard._id}
                    _id={marketCard._id}
                    imageUrl={marketCard.imageUrl}
                    title={marketCard.title}
                    authorName={marketCard.author.name}
                    authorImageUrl={marketCard.author.imageUrl}
                    date={marketCard.createdAt}
                    contents={marketCard.contents}
                    price={marketCard.price}
                    category={marketCard.category}
                    isSoldOut={marketCard.isSoldOut}
                  />
                ))}
          </div>
          <div className={MarketStyle.footer}>
            {/* <div className={MarketStyle.moreBtnInner}> */}
            {isSearch ? (
              isLastPage ? null : (
                <button
                  className={MarketStyle.moreBtn}
                  onClick={searchMoreBtnHandler}
                >
                  더보기
                </button>
              )
            ) : marketCards && hasNextPage ? (
              <button className={MarketStyle.moreBtn} onClick={loadMoreCards}>
                더보기
              </button>
            ) : null}
            <EditIcon
              className={MarketStyle.writeBtnOutline}
              sx={{ fontSize: 30 }}
              onClick={() => {
                navigate("/createMarketCard");
              }}
            ></EditIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
