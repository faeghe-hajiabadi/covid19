import React from "react";
import "./topRate.scss";
import upArrow from "../../img/upArrow.png";
import downArrow from "../../img/downArrow.png";
import AnimateHeight from "react-animate-height";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryContainer,
  VictoryLabel,
} from "victory";

export default function TopRateItem(props) {
  const { item, progress, isCollapse, data } = props;
  const heightBoxOpen = isCollapse ? "auto" : 0;
  const heightBoxClosed = isCollapse ? 0 : "auto";

  let progressClass = "";
  let arrowSrc = '';
  if (progress < 0) {
    progressClass = "greenProgress";
    arrowSrc = downArrow;

  } else if (progress > 0) {
    progressClass = "redProgress";
    arrowSrc = upArrow;

  } else {
    progressClass = "zeroProgress";

  }

  

  return (
    <>
      <AnimateHeight
        duration={500}
        height={heightBoxClosed} // see props documentation below
      >
        <div className="topRateItemContainerCollapse">
          <div className="topRateConfirmed">{item.confirmed}</div>
          <div className="topRateCountry">{item.country}</div>
          <div className={progressClass}>
            {arrowSrc !== '' &&
             <img width="15" height="15" src={arrowSrc}></img>
            }
           
            {Math.abs(progress)}%
          </div>
        </div>
      </AnimateHeight>

      <AnimateHeight
        duration={500}
        height={heightBoxOpen} // see props documentation below
      >
        <div className="topRateItemContainerExpand">
          <div className="topRateConfirmedExpand">{item.confirmed}</div>
          <div className="topRateCountry">{item.country}</div>
          <div className="chartContainer">
            <VictoryChart
              containerComponent={<VictoryContainer responsive={true} />}
              width={200}
              height={150}
            >
              {/* X Axis */}
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { fontSize: 5, padding: 30 },
                  tickLabels: {
                    grid: "none",
                    fontSize: 10,
                    angle: 90,
                    padding: 30,
                    fill: "FFFFFF",
                  },
                }}
                axisLabelComponent={<VictoryLabel />}
              />
              <VictoryLine
                interpolation="natural"
                data={data}
                style={{
                  data: {
                    grid: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                  },
                  parent: { grid: "none", border: "1px solid #ccc" },
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </AnimateHeight>
    </>
  );
}
