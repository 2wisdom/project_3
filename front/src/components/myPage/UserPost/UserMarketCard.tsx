import { useNavigate } from "react-router-dom";
import Card from "../../../styles/showOffPage/ShowCard.module.css";
import Avatar from "@mui/material/Avatar";
import useUserStore from "../../../store/Login";
import Stack from "@mui/material/Stack";
import { SquareBtn, white, black } from "../../../styles/buttons/BasicBtn";
import * as Api from "../../../api/Api";
import { props } from "./UserPostCards";
import { TopNavStore, pageStore } from "@/store/MyPage";

const UserPostCard = ({
  _id,
  imageUrl,
  title,
  userName,
  date,
  contents,
  showCards,
  setShowCards,
  price,
  category,
}: props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const createDate = date.split("T");
  const { pickedTopNav } = TopNavStore();
  const { page } = pageStore();

  const deleteCard = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const res = await Api.delete(`${pickedTopNav.apiAddress}`, `${_id}`);
        if (res.status == 200) {
          //삭제 후 페이지 재정렬
          for (let i = 1; i <= page; i++) {
            try {
              const res = await Api.get(
                "users",
                `${pickedTopNav.apiAddress}?userId=${user.userId}&page=${i}`
              );
              if (i == 1) {
                setShowCards(res.data.userMarkets);
              } else {
                setShowCards([...showCards, ...res.data.userMarkets]);
              }
            } catch (err) {
              console.log("더보기 에러: ", err);
            }
          }
        }
      } catch (err) {
        alert("게시물 삭제 도중 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  return (
    <>
      <div className={Card.inner}>
        <img
          className={Card.Image}
          src={`${imageUrl}`}
          style={{ width: 267, height: 200 }}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        />
        <h3
          className={Card.title}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        >
          [{category}] {title}
        </h3>
        <div
          className={Card.footer}
          onClick={() => navigate(`/marketCardDetail/${_id}`)}
        >
          <div className={Card.userInner}>
            <Avatar
              alt="Remy Sharp"
              src={`http://${window.location.hostname}:5000/${user.imageUrl}`}
              sx={{ width: 24, height: 24 }}
            />

            <h5 className={Card.userName}>{userName}</h5>
          </div>
          <div className={Card.price}>{price && `${price.toLocaleString(
            "ko-KR"
          )} 원`}</div>
        </div>
        <Stack direction="row" alignItems="center" spacing={2} ml={5}>
          <SquareBtn theme={white} type="button" onClick={deleteCard}>
            삭제
          </SquareBtn>
          <SquareBtn
            theme={black}
            type="button"
            onClick={() =>
              navigate(`/market/editcard/${_id}`, {
                state: {
                  title,
                  contents,
                  imageUrl,
                  price,
                  _id: `${_id}`,
                  pickedMyPageNav: `${pickedTopNav.apiAddress}`,
                  category,
                },
              })
            }
          >
            수정
          </SquareBtn>
        </Stack>
      </div>
    </>
  );
};

export default UserPostCard;
