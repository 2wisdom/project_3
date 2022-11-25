import * as React from 'react';
import { useEffect, useState } from 'react';
import Search from "../components/search/Search";
import ShowOff from "../styles/showOffPage/ShowOff.module.css"
import * as Api from "../api/Api";
const CommuityShowOff = () => {
  const showOffText : String= "내가 찍은 사진을 자랑해보세요";

  interface CardData {
    postId:number,
    userId:string,
    email:string,
    title:string,
    contents:string,

  }
  const CardData = () => {
    const [cardData,setCardData] = useState<CardData>({
      postId:0,
      userId:"",
      email:"",
      title:"",
      contents:"",
    })
  }

    Api.get("posts").then(res => {
      console.log('res',res);
      console.log('dataType',typeof(res.data.docs[0].createdAt))
    }
    );
    Api.get("posts?page=2&limit=10").then(res => {
      console.log('posts?page=1&limit=10',res);
    }
    );
    Api.get("posts/2").then(res => {
      console.log('posts/:2',res);
    }
    );
    return (
        <>
        <div className={ShowOff.container}>
          <div className={ShowOff.Inner}>
            <div className={ShowOff.buttonContainer}>
              <div className={ShowOff.buttonInner}>
              <button className={ShowOff.yellowBtn}>질문하기</button>
              <button  className={ShowOff.yellowBtn}>자랑하기</button>
              </div>
            </div>
            <div className={ShowOff.rightInner}>
              <div className={ShowOff.titleSearchInner}>
                <h2 className={ShowOff.title}>내가 찍은 사진을 자랑해보세요</h2>
                <Search></Search>
              </div>
              <div className={ShowOff.cardInner}></div>
            </div>
          </div>
        </div>
      
    </>
    )
}

export default CommuityShowOff;