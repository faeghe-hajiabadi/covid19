import React, { useState } from "react";
import "./topRate.scss";

import TopRateItem from "./TopRateItem";

export default function TopRate(props) {
  let data = [];

  const onhoverTrigger = (index) => () => {
    setHover(index);
  };

  const [hoverIndex, setHover] = useState(0);
  const topRateItem = props.topRate.map((item, index) => {
    let dates = Object.keys(item.timelines);
    let datesLenght = dates.length;
    let firstItem = item.timelines[dates[datesLenght - 2]];
    let secondItem = item.timelines[dates[datesLenght - 1]];
    let isCollapse = index == hoverIndex ? true : false;
    let progress = Math.round(((firstItem - secondItem) / secondItem)*100);
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
    let containerClassName = isCollapse? 'topRateContainerExpand':'topRateContainerCollapse';
    return (
      <div
        className={containerClassName}
        onMouseEnter={onhoverTrigger(index)}
      >
        <TopRateItem
          isCollapse={isCollapse}
          progress={progress}
          item={item}
          data={data}
        />
      </div>
    );
  });
  return <div className="topRateContainer">{topRateItem}</div>;
}
