import * as React from "react";
import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Show from "../styles/showOffPage/ShowPage.module.css";
import ShowCardList from "../components/communityShow/CardList";
import * as showCardStore from "../store/CommunityShowCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as Api from "../api/Api";
const CommuityShow = () => {
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

  // console.log("apiGetShowCardData", apiGetShowCardData);
  // console.log("showCardData", showCardData);
  console.log(
    "showCardData.docs && showCardData.docs[0]",
    showCardData.docs && showCardData.docs[0]
  );
  // console.log("showCardData.docs._id", showCardData.docs._id);

  // console.log("showCardsType", typeof showCards);
  // const setShowCard = showCardStore((state) => state.setShowCard);
  // // const ShowCard = showCardStore((state) => state.showCard);
  // const ShowCard = showCardStore();
  // useEffect(() => {
  //   Api.get("posts").then((res) => {
  //     setShowCard(res.data);
  //     // console.log("res", res.data.docs[0]._id);
  //   });
  // }, []);
  // console.log("showCard", ShowCard.showCard);
  // console.log("CardData", showCardData);
  // Api.get("posts?page=2&limit=10").then((res) => {
  //   console.log("posts?page=1&limit=10", res);
  // });
  // Api.get("posts/2").then((res) => {
  //   console.log("posts/:2", res);
  // });
  // {
  //   showCards &&
  //     showCards.docs?.map((item: any) => (
  //       <div key={item._id}>value: {item}</div>
  //     ));
  // }
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
              {/* {showCardData.docs &&
                showCardData.docs.map((item: any) => (
                  <ul>
                    <li key={item._id}>imageUrl : {item.imageUrl}</li>
                    <li key={item._id}>title : {item.title}</li>
                    <li key={item._id}>userImage : {item.author.imageUrl}</li>
                    <li key={item._id}>userName : {item.author.name}</li>
                    <li key={item._id}>date : {item.updateAt}</li>
                  </ul>
                ))} */}
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

export default CommuityShow;
