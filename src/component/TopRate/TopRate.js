import React, { useState } from "react";
import "./topRate.scss";
import TopRateItem from "./TopRateItem";
import Swiper from "react-id-swiper";
// Version <= 2.3.2

// Version >= 2.4.0
import "swiper/css/swiper.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function TopRate(props) {
  const params = {
    slidesPerView: 5,
    spaceBetween: 50,

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20
      }
    }
  };
  let data = [];

  const onhoverTrigger = (index) => () => {
    setHover(index);
  };

  const [hoverIndex, setHover] = useState(0);
  const size = props.size;

  const topRateItem = props.topRate.map((item, index) => {
    let dates = Object.keys(item.timelines);
    let datesLenght = dates.length;
    let firstItem = item.timelines[dates[datesLenght - 2]];
    let secondItem = item.timelines[dates[datesLenght - 1]];
    let isCollapse = index === hoverIndex ? true : false;
    let progress = Math.round(((firstItem - secondItem) / secondItem) * 100);
    data = [];
    for (let i = datesLenght - 8; i < datesLenght - 1; i++) {
      let date = dates[i];
      let value = item.timelines[dates[i]];

      const SubData = {
        x: date.substr(5, 5),
        y: value,
      };
      data.push(SubData);
    }
    let containerClassName = isCollapse
      ? "topRateContainerExpand"
      : "topRateContainerCollapse";
    return (
      <div className={containerClassName} onMouseEnter={onhoverTrigger(index)}>
        <TopRateItem
          isCollapse={isCollapse}
          progress={progress}
          item={item}
          data={data}
        />
      </div>
    );
  });
  return (
    <div style={{ height: size.height * 0.15 }} className="topRateContainer">
      {isMobile && (
        <Swiper {...params}>
          <div>{topRateItem[0]}</div>
          <div>{topRateItem[1]}</div>
          <div>{topRateItem[2]}</div>
          <div>{topRateItem[3]}</div>
        </Swiper>
      )}
      {!isMobile && <>{topRateItem}</>}
    </div>
  );
}
