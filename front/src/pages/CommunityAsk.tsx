import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import AskCardList from "../components/communityAsk/AskCardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useDebounce from "@/useDebounce";
import * as Api from "../api/Api";
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
const CommunityAsk = () => {
  const navigate = useNavigate();
  const [askCardData, setAskCardData] = useState<AskCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  //검색
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);
  const [searchData, setSearchData] = useState<AskCard[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = searchPage >= totalPage;
  const apiGetShowCardData = async () => {
    await Api.get("asks", null)
      .then((res) => {
        setAskCardData(res.data.docs);
        setHasNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      })
      .catch((err) => {
        console.log("asks실패!", err);
      });
  };
  useEffect(() => {
    apiGetShowCardData();
  }, []);
  console.log("askCardData", askCardData);
  const moreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    Api.get(`asks?page=${page + 1}&limit=8`, null).then((res) => {
      setAskCardData([...askCardData, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);
      setPage(res.data.page);
    });
  };

  //검색구현함수
  useEffect(() => {
    const getSearchCards = async () => {
      return await Api.get(
        `search/asks?option=all&question=${debounceValue}&page=${searchPage}`,
        null
      )
        .then((res) => {
          setSearchData(res.data.searchedAsks);
          setTotalPage(res.data.totalPage);
          console.log("res.data.searchedPosts-ask", res.data);
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
      setTotalPage(1);
    }
  }, [debounceValue]);
  console.log("totalPage", totalPage);
  console.log("searchPage");
  const searchMoreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    Api.get(
      `search/asks?option=all&question=${debounceValue}&page=${searchPage}`,
      null
    ).then((res) => {
      setSearchData([...askCardData, ...res.data.searchedAsks]);
      setSearchPage(searchPage + 1);
    });
    if (!debounceValue) {
      setIsSearch(false);
      setSearchPage(1);
      setTotalPage(1);
    }
  };
  return (
    <div className={Show.container}>
      {/* <div className={Show.inner}> */}
      <div className={Show.titleSearchInner}>
        <h2 className={Show.title}>궁금한 내용들을 물어보세요</h2>
        <div className={Show.itemInner}>
          <p className={Show.itemAsk}>질문하기</p>
          <p
            className={Show.itemShow}
            onClick={() => {
              navigate("/communityShowOff");
            }}
          >
            자랑하기
          </p>
        </div>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        ></Search>
      </div>

      <div className={Show.cardInner}>
        {isSearch ? (
          <AskCardList askCardData={searchData}></AskCardList>
        ) : (
          <AskCardList askCardData={askCardData}></AskCardList>
        )}
      </div>
      <div className={Show.footer}>
        {/* <div className={Show.moreBtnInner}> */}
        {isSearch ? (
          isLastPage ? null : (
            <button className={Show.moreBtn} onClick={searchMoreBtnHandler}>
              더보기
            </button>
          )
        ) : askCardData && hasNextPage ? (
          <button className={Show.moreBtn} onClick={moreBtnHandler}>
            더보기
          </button>
        ) : null}
        {/* <div className={Show.writeBtnInner}> */}
        <EditIcon
          className={Show.writeBtnOutline}
          sx={{ fontSize: 30 }}
          onClick={() => {
            navigate("/createAskCard");
          }}
        ></EditIcon>
        {/* </div> */}
      </div>
    </div>

    // </div>
  );
};

export default CommunityAsk;
