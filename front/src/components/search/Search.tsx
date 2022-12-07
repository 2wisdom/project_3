import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as SearchStyle from "../../styles/search/SearchStyle";
import SearchIcon from "@mui/icons-material/Search";
import { ListItem } from "@mui/material";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import useDebounce from "@/useDebounce";
import * as Api from "../../api/Api";
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
}

const Search = ({
  key,
  setShowCardData,
}: {
  key: string;
  setShowCardData: Dispatch<SetStateAction<showCard[]>>;
}) => {
  // console.log("key-search", key);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debounceValue = useDebounce(searchInput);
  const [showCards, setShowCards] = useState<showCard[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  // console.log("debounceValue", debounceValue);
  // const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
  //   if (e.key === "Enter") {
  //     useEffect(() => {
  //       if (searchInput) {
  //         Api.get(
  //           `search/posts?option=all&question=${searchInput}&page=${page}`,
  //           null
  //         ).then((res) => {
  //           setShowCardData(res.data.docs);
  //           console.log("search-data", res);
  //         });
  //       }
  //     }, [searchInput]);
  //   }
  // };
  useEffect(() => {
    const getSearchCards = async () => {
      return await Api.get(
        `search/posts?option=all&question=${debounceValue}&page=${page}`,
        null
      )
        .then((res) => {
          setShowCardData(res.data);
          // console.log("search-data", res.data);
        })
        .catch((err) => {
          console.log("getSearchCards Err", err);
        });
    };
    if (debounceValue) getSearchCards();
  }, [debounceValue]);
  // console.log()
  return (
    <>
      <SearchStyle.Container>
        <SearchStyle.Input
          className="searchForm"
          type="text"
          value={searchInput}
          onChange={handleOnChange}
          // onKeyPress={handleKeyPress}
          placeholder="검색어를 입력하세요"
        ></SearchStyle.Input>
        <SearchStyle.Iconlocation>
          <SearchIcon color="action" sx={{ fontSize: 30 }}></SearchIcon>
        </SearchStyle.Iconlocation>
      </SearchStyle.Container>
    </>
  );
};

export default Search;
