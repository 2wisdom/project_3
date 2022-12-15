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
import useUserStore from "@/store/Login";

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
  const {user} = useUserStore();
  const [askCardData, setAskCardData] = useState<AskCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

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

  //검색
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);
  const [searchData, setSearchData] = useState<AskCard[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const isLastPage = searchPage >= totalPage;

  const [isNothing, setIsNothing] = useState<boolean>(false);
  const apiGetShowCardData = async () => {
    await Api.get("asks", null)
      .then((res) => {
        console.log("res", res);
        setAskCardData(res.data.docs);
        setHasNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      })
      .catch((err) => {
        alert("게시물이 없습니다! 첫번째 게시물을 올려주세요😆");
      });
  };
  useEffect(() => {
    apiGetShowCardData();
  }, []);

  const moreBtnHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    Api.get(`asks?page=${page + 1}&limit=6`, null).then((res) => {
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
          setIsSearch(true);
          setSearchPage(searchPage + 1);
        })
        .catch((err) => {
          alert("검색결과가 없습니다.");
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
        <EditIcon
          className={Show.writeBtnOutline}
          sx={{ fontSize: 30 }}
          onClick={() => {
            navigate("/createAskCard");
            LoginToHavePermission()
          }}
        ></EditIcon>
      </div>
    </div>
  );
};

export default CommunityAsk;
