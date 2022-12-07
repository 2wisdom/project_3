import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../components/communityShow/CardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
const Market = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(8);
  // const [challengeData, setChallengeData] = useState([]);
  // const [originalData, setOriginalData] = useState([]);

  const showCardData = showCardStore.showCardStore(
    (state: any) => state.showCards
  );
  const apiGetShowCardData = showCardStore.showCardStore(
    (state: any) => state.apiGetShowCards
  );

  useEffect(() => {
    apiGetShowCardData();
  }, []);
  const onClickHandelr = () => {
    navigate("/createShowCard");
  };



return (
    <>
      <div className={Show.container}>
        <div className={Show.Inner}>
          <div className={Show.buttonContainer}>
            <div className={Show.buttonInner}>
              <button className={Show.grayBtn}>질문하기</button>
              <button className={Show.yellowBtn}>자랑하기</button>
            </div>
          </div>
          <div className={Show.rightInner}>
            <div className={Show.titleSearchInner}>
              <h2 className={Show.title}>내가 찍은 사진을 자랑해보세요</h2>
              <Search showCardData={showCardData}></Search>
            </div>
            <div className={Show.cardInner}>
              {showCardData && (
                <ShowCardList showCardData={showCardData}></ShowCardList>
              )}
            </div>
            <div className={Show.footer}>
              <div className={Show.moreBtnInner}>
                {showCardData.docs && visible < showCardData.docs.length ? (
                  <button className={Show.moreBtn}> 더보기 </button>
                ) : null}
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
    </>
  );
};

export default Market;