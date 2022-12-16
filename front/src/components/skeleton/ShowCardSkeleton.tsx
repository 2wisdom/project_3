import Skeleton from "react-loading-skeleton";
import Card from "../../styles/showOffPage/ShowCard.module.css";
const ShowCardSkeleton = () => {
  return (
    <div className={Card.inner}>
      <Skeleton className={Card.Image} style={{ width: 267, height: 200 }} />
      <Skeleton className={Card.title}></Skeleton>
      <div className={Card.footer}>
        <div className={Card.userInner}>
          <Skeleton width={"24px"} height={"24"} />

          <Skeleton className={Card.userName}></Skeleton>
        </div>
        <Skeleton className={Card.data}></Skeleton>
      </div>
    </div>
  );
};

export default ShowCardSkeleton;
