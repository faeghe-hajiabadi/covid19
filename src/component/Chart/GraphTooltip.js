import React from "react";

export default function GraphTooltip() {
    console.log("this is tooltip and ",x,y,datum)
  const { datum, x, y } = this.props;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <div>
        hello
      </div>
    </g>
  );
}
