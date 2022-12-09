import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../components/communityShow/CardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useDebounce from "@/useDebounce";

import * as Api from "../api/Api";
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
  errorMessage: string;
  totalPage: string;
}

const CommuityShow = () => {
  const navigate = useNavigate();
  const [showCardData, setShowCardData] = useState<showCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);
  const [searchData, setSearchData] = useState<showCard[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = searchPage >= totalPage;
  console.log("searchInput", searchInput);
  const key = "posts";
  console.log("key", key);
  const apiGetShowCardData = async () => {
    await Api.get("posts", null)
      .then((res) => {
        setShowCardData(res.data.docs);
        setHasNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      })
      .catch((err) => {
        console.log("posts실패!", err);
      });
  };
  useEffect(() => {
    apiGetShowCardData();
  }, []);

  const moreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    Api.get(`posts?page=${page + 1}&limit=8`, null).then((res) => {
      setShowCardData([...showCardData, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(res.data.page);
    });
  };
  //검색구현함수
  useEffect(() => {
    const getSearchCards = async () => {
      return await Api.get(
        `search/posts?option=all&question=${debounceValue}&page=${searchPage}`,
        null
      )
        .then((res) => {
          setSearchData(res.data.searchedPosts);
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
      `search/posts?option=all&question=${debounceValue}&page=${searchPage}`,
      null
    ).then((res) => {
      setSearchData([...searchData, ...res.data.searchedPosts]);
      setSearchPage(searchPage + 1);
    });
    if (!debounceValue) {
      setIsSearch(false);
      setSearchPage(1);
    }
  };
  console.log("searchData", searchData);
  return (
    <div className={Show.container}>
      <div className={Show.Inner}>
        <div className={Show.buttonContainer}>
          <div className={Show.buttonInner}>
            <button
              className={Show.grayBtn}
              onClick={() => {
                navigate("/communityAsk");
              }}
            >
              질문하기
            </button>
            <button className={Show.yellowBtn}>자랑하기</button>
          </div>
        </div>
        <div className={Show.rightInner}>
          <div className={Show.titleSearchInner}>
            <h2 className={Show.title}>내가 찍은 사진을 자랑해보세요</h2>(
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            ></Search>
            )
          </div>
          <div className={Show.cardInner}>
            {isSearch ? (
              <ShowCardList showCardData={searchData}></ShowCardList>
            ) : (
              <ShowCardList showCardData={showCardData}></ShowCardList>
            )}
          </div>
          <div className={Show.footer}>
            <div className={Show.moreBtnInner}>
              {isSearch ? (
                isLastPage ? (
                  <button
                    className={Show.moreBtn}
                    onClick={searchMoreBtnHandler}
                  >
                    더보기
                  </button>
                ) : null
              ) : showCardData && hasNextPage ? (
                <button className={Show.moreBtn} onClick={moreBtnHandler}>
                  더보기
                </button>
              ) : null}
              {/* {showCardData && hasNextPage ? (
                <button className={Show.moreBtn} onClick={moreBtnHandler}>
                  더보기
                </button>
              ) : null} */}
            </div>
            <div className={Show.writeBtnInner}>
              <EditIcon
                className={Show.writeBtnOutline}
                sx={{ fontSize: 30 }}
                onClick={() => {
                  navigate("/createShowCard");
                }}
              ></EditIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuityShow;
