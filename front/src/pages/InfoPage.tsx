import NavBar from '@/components/NavBar';
import React from "react";
import InfoPage1 from "../components/infopage/InfoPage1";
import InfoPage2 from "../components/infopage/InfoPage2";
import InfoPage3 from "../components/infopage/InfoPage3";
import InfoPage4 from "../components/infopage/InfoPage4";
import FullpageContainer from "../styles/FullPageContainer";
const Info = () => {
  return (
    <FullpageContainer>
      <div className="container1">
        <NavBar></NavBar>
        <InfoPage1></InfoPage1>
        <InfoPage2></InfoPage2>
        <InfoPage3></InfoPage3>
        
        <InfoPage4></InfoPage4>
        
      </div>
    </FullpageContainer>
  );
}

export default Info;
