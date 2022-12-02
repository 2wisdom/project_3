import React, { useEffect, useState } from "react";
import * as SearchStyle from "../../styles/search/SearchStyle";
import SearchIcon from "@mui/icons-material/Search";
import * as showCardStore from "../../store/CommunityShowCard";
import { ListItem } from "@mui/material";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";

const Search = ({
  showCardData,
}: {
  showCardData: showCardStore.showCardList;
}) => {
  const [searchInput, setSearchInput]: [string, (search: string) => void] =
    useState("");

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: string };
  }) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    const result =
      showCardData &&
      showCardData.docs?.filter((item: showCardStore.showCardTest) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
  }, [searchInput]);
  return (
    <>
      <SearchStyle.Container>
        <SearchStyle.Input
          className="searchForm"
          type="text"
          value={searchInput}
          onChange={handleOnChange}
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
