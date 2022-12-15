import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../components/communityShow/CardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useDebounce from "@/useDebounce";
import useUserStore from "@/store/Login";

import * as Api from "../api/Api";
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
  errorMessage: string;
  totalPage: string;
}

const CommuityShow = () => {
  const navigate = useNavigate();
  const {user} = useUserStore();
  const [showCardData, setShowCardData] = useState<ShowCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);
  const [searchData, setSearchData] = useState<ShowCard[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = searchPage >= totalPage;
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

  //로그인 필요 알림
  const LoginToHavePermission = () => {
    const isLogin = user.email !== "";
    if (!isLogin) {
      if (
        confirm(
          "로그인이 필요한 기능입니다\n로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }else {
        navigate(-1)
      }
    }
  }

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
      <div className={Show.titleSearchInner}>
        <h2 className={Show.title}>나만의 힐링스팟을 보여주세요</h2>
        <div className={Show.itemInner}>
          <p
            className={Show.itemShow}
            onClick={() => {
              navigate("/communityAsk");
            }}
          >
            질문하기
          </p>
          <p className={Show.itemAsk}>자랑하기</p>
        </div>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        ></Search>
      </div>
      <div className={Show.cardInner}>
        {isSearch ? (
          <ShowCardList showCardData={searchData}></ShowCardList>
        ) : (
          <ShowCardList showCardData={showCardData}></ShowCardList>
        )}
      </div>
      <div className={Show.footer}>
        {isSearch ? (
          isLastPage ? null : (
            <button
              type="button"
              className={Show.moreBtn}
              onClick={searchMoreBtnHandler}
            >
              더보기
            </button>
          )
        ) : showCardData && hasNextPage ? (
          <button
            type="button"
            className={Show.moreBtn}
            onClick={moreBtnHandler}
          >
            더보기
          </button>
        ) : null}
        <EditIcon
          className={Show.writeBtnOutline}
          sx={{ fontSize: 30 }}
          onClick={() => {
            navigate("/createShowCard");
            LoginToHavePermission();
          }}
        ></EditIcon>
      </div>
    </div>
  );
};

export default CommuityShow;
