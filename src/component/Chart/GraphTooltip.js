import React from "react";
import "./graphTooltip.scss";
import calender from "../../img/calender.png";
import sick from "../../img/sick.png";

export default class GraphTooltip extends React.Component {
  render() {
    console.log("this is props in tooltip", this.props);

    const { datum, x, y } = this.props;
    return (
      <g style={{ pointerEvents: "none" }} className="graph-tooltip">
        <foreignObject x={x} y={y} width="100" height="100">
          <div
            style={{
              backgroundColor: "#F0F3F8",
              padding: "10px",
              color: "black",
              fontSize: "10px",
              fontFamily: "Source Sans Pro",
            }}
            className="graph-tooltip"
          >
            <div>
              <img width="10" height="10" src={calender}></img>
              <span> {datum.x}</span>
            </div>
            <div>
              <img width="10" height="10" src={sick}></img>
              <span> {datum.y}</span>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  }
}
