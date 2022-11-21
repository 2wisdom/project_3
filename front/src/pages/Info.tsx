import React from "react";
import MainPage1 from "../components/mainpage/MainPage1";
import MainPage2 from "../components/mainpage/MainPage2";
import MainPage3 from "../components/mainpage/MainPage3";
import MainPage4 from "../components/mainpage/MainPage4";
import FullpageContainer from "../styles/FullPageContainer";
const Info = () => {
  return (
    <FullpageContainer>
      <div className="container1">
        <MainPage1></MainPage1>
        <MainPage2></MainPage2>
        <MainPage3></MainPage3>
        <MainPage4></MainPage4>
      </div>
    </FullpageContainer>
  );
}

export default Info;
