import React, { useEffect } from "react";
import * as Api from "../api/Api";
const ShowCardDetail = ({ postId }: { postId: string }) => {
  let res = {};
  if (postId) {
    try {
      res = Api.get(`posts/${postId}`, null);
      console.log("res", res);
    } catch (err) {
      console.log("detailErr", err);
    }
  }

  //   console.log("ShowCardDetail-postId", postId);
  return <div></div>;
};

export default ShowCardDetail;
