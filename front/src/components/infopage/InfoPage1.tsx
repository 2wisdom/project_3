import InfoPageRoot from "../../styles/infoPage/InfoPageRoot";
import InfoPageContainer from "../../styles/infoPage/InfoPageContainer";
import Info1 from "../../styles/infoPage/InfoPage.module.css";
const InfoPage1 = () => {
  return (
    <>
    <InfoPageRoot>
      <InfoPageContainer>
      <div className={Info1.Inner}>
        <div className={Info1.title}>
          <p className={Info1.description}>내 손안의 식물도감</p>
          <p className={Info1.logoTitle}>잎게뭐야</p>
        </div>
      </div>
      </InfoPageContainer>
    </InfoPageRoot>
      
    </>
  );
};

export default InfoPage1;
