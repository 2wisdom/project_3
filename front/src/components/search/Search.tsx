import React, { useState } from "react";
import * as SearchStyle from "../../styles/search/SearchStyle";
import SearchIcon from '@mui/icons-material/Search';
const Search = () => {

    const [searchInput,setSearchInput] = useState("");

    const handleOnChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchInput(e.target.value);
    }
    return(
        <>
        <SearchStyle.Container>
        <SearchStyle.Input className='searchForm' type="text" value={searchInput} onChange={handleOnChange} placeholder="검색어를 입력하세요"></SearchStyle.Input>
       <SearchStyle.Iconlocation>
        <SearchIcon color="action" sx={{ fontSize: 30 }}></SearchIcon>
        </SearchStyle.Iconlocation>
        </SearchStyle.Container>
        </>
    )
} 

export default Search;