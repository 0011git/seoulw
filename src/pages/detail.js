// 2-1. 디테일
import React, { useEffect, useState } from "react";
import detailStyle from "@/styles/detail.module.scss";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Review from "@/components/Review";
import Map from "@/components/Map";
import { useSearchParams } from "next/navigation";
import { fn } from "@/utils/apiFunc";
// var parseString = require("xml2js").parseString;

function Detail() {
  // 탭 메뉴
  const [all, setAll] = useState(1);
  const [info, setInfo] = useState();
  const params = useSearchParams();
  const id = params.get("mt20id");

  useEffect(() => {
    fn.detail(id).then((res) => {
      let d = { ...res };
      for (let key in d.detail) {
        d.detail[key] = d.detail[key]._text;
      }
      for (let key in d.detailMap) {
        d.detailMap[key] = d.detailMap[key]._text;
      }
      setInfo(d);
    });
  }, []);

  const tap = (i) => {
    setAll(i);
  };

  // parseString(itemXML, function (err, result) {
  //   detail = result.dbs.db;
  // });

  //하단의 공연 예매 버튼
  // useEffect(() => {
  //   switch (status) {
  //     case 'reserved':
  //       setButtonText('예약하기');
  //       break;
  //     case 'completed':
  //       setButtonText('공연완료');
  //       break;
  //     case 'upcoming':
  //       setButtonText('공연예정');
  //       break;
  //     default:
  //       setButtonText('예약하기'); // 기본값
  //   }
  // }, [status]);

  //리뷰 별점

  // const ARRAY = [0, 1, 2, 3, 4];
  // const [score, setScore] = useState([false, false, false, false, false]);

  // const starScore = (index) => {
  //   let star = [...score];
  //   for (let i = 0; i < 5; i++) {
  //     star[i] = i <= index ? true : false;
  //   }
  //   setScore(star);
  // };

  if (!info) return <></>;

  return (
    <>
      <div className={detailStyle.container}>
        <div className={detailStyle.header}>
          {/* 여기에 상단 타이틀 이미지 넣기 */}
          <img className={detailStyle.headerposter} src={info.detail.poster} />
          <h1>{info.detail.prfnm}</h1>
          <ul>
            <li>{info.detail.prfage}</li>
            <li>
              <img src="/assets/icons/map.svg" />
              {info.detail.fcltynm}
            </li>
            <li className={detailStyle.time}>
              <img src="/assets/icons/calender.svg" />
              {info.detail.prfpdfrom} ~ {info.detail.prfpdto}
              {/* 끝나는 날짜 코드로 가져오기 */}
            </li>
            <li>
              {/* 해당 값은 통으로 들어오고 코드로 가져오기 */}
              <img src="/assets/icons/watch.svg" />
              {info.detail.dtguidance}
            </li>
            <li>
              <img src="/assets/icons/runnigtime.svg" />
              {info.detail.prfruntime}
            </li>
          </ul>
        </div>

        {/* 탭 메뉴 */}
        <ul className={detailStyle.tap}>
          <li>
            <button
              className={all === 1 ? detailStyle.selected : ""}
              onClick={() => tap(1)}
            >
              공연 정보
            </button>
            <button
              className={all === 2 ? detailStyle.selected : ""}
              onClick={() => tap(2)}
            >
              후기
            </button>
            <button
              className={all === 3 ? detailStyle.selected : ""}
              onClick={() => tap(3)}
            >
              장소
            </button>
          </li>
        </ul>

        <div className={detailStyle.information}>
          {all === 1 && (
            <div className={detailStyle.info}>
              <div className={detailStyle.infoetc}>
                {/* 공연 정보 */}
                <ul>
                  <li className={detailStyle.infotitle}>공연정보</li>
                  <li>{info.detail.genrenm}</li>
                </ul>
                {/* 캐스팅 리스트 */}
                <ul className={detailStyle.cast}>
                  <li className={detailStyle.infotitle}>캐스팅</li>
                  <li>{info.detail.prfcast}</li>
                </ul>
                {/* 가격 */}
                <ul className={detailStyle.place}>
                  <li className={detailStyle.infotitle}>가격</li>
                  <li>{info.detail.pcseguidance}</li>
                </ul>
                {/* <img src={info.detail?.styurls[0]?.styurl[0]} /> */}

                {/* 장소까지 info에 포함되어야 함.  */}
                <hr />
                <div className={detailStyle.map}>
                  <h2>장소</h2>
                  <div className={detailStyle.mapinfo}>
                    <p>서울숲공원 (가족마당) </p>
                    <p>서울특별시 성동구 뚝섬로 273(성수동1가)</p>
                    <div className={detailStyle.mapnum}>
                      <p>02-460-2905</p>
                      <Link href="" style={{ marginTop: "5px" }}>
                        홈페이지
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="여기가 리뷰"> */}
        {all === 2 && <Review info={info.detail} id={id} />}

        {all === 3 && (
          <div className={detailStyle.reivew}>
            <Map info={info.detailMap} />
          </div>
        )}

        <div className={detailStyle.footer}>
          <button className={detailStyle.reserveButton}>예약하기</button>
        </div>
      </div>
    </>
  );
}

export default Detail;
