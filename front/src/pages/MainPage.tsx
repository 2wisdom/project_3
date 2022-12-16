import Info1 from "../styles/infoPage/InfoPage.module.css";
import { useNavigate } from "react-router-dom";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
} from "react-scroll-motion";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <NavBar/>  */}

      <ScrollContainer snap="mandatory">
        <ScrollPage page={0}>
          <Animator animation={batch(Fade())}>
            <div className={Info1.container}>
              <div className={Info1.Inner}>
                <div className={Info1.title}></div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={batch(Fade())}>
            <div className={Info1.sub1}>
              <div className={Info1.subImage}></div>
              <div className={Info1.subRight}>
                <p className={Info1.subTitle}>
                  내가 보고 있는 식물을 바로 찾고 싶다면?
                </p>
                <button
                  type="button"
                  className={Info1.yellowBtn}
                  onClick={() => {
                    navigate("/findPlant");
                  }}
                >
                  식물찾기
                </button>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={batch(Fade())}>
            <div className={Info1.sub1}>
              <div className={Info1.subRight}>
                <p className={Info1.subTitle2}>
                  내가 찍은 사진을 자랑하고 싶다면?
                </p>
                <button
                  type="button"
                  className={Info1.yellowBtn3}
                  onClick={() => {
                    navigate("/communityShowOff");
                  }}
                >
                  자랑하기
                </button>
              </div>
              <div className={Info1.subImage2}></div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={batch(Fade())}>
            <div className={Info1.sub1}>
              <div className={Info1.subImage3}></div>
              <div className={Info1.subRight}>
                <p className={Info1.subTitle}>식물에 대해 궁금한게 있다면?</p>
                <button
                  type="button"
                  className={Info1.yellowBtn}
                  onClick={() => {
                    navigate("/communityAsk");
                  }}
                >
                  질문하기
                </button>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={4}>
          <Animator animation={batch(Fade())}>
            <div className={Info1.container}>
              <div className={Info1.InnerSub4}>
                <div className={Info1.title4}>
                  <p className={Info1.sub4Title}>
                    내가 본 식물을 바로 구매하고 싶다면?
                  </p>
                  <button
                    type="button"
                    className={Info1.yellowBtn}
                    onClick={() => {
                      navigate("/market");
                    }}
                  >
                    식물마켓
                  </button>
                </div>
              </div>
            </div>
            <div className={Info1.footer}>
              <div className={Info1.footerInner}>
                <div className={Info1.footerTitle}></div>
                <div className={Info1.copyRight}>
                  Copyright 2022. 잎게뭐야. All Rights Reserved.
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </>
  );
};

export default MainPage;
