import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import "./related.scss";

export default function RelatedItems(props) {
  const { url, description, imgSrc } = props;
  const [imgHover, setImgHover] = useState(false);
  const heightBox = imgHover ? "auto" : 0;

  return (
    <a className="relatedItemParent" href={url}>
      <img
        width="90"
        height="90"
        src={imgSrc}
        className="relatedItemImg"
        alt="world health organization"
        onMouseOver={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      ></img>
      <AnimateHeight
        duration={500}
        height={heightBox} // see props documentation below
      >
        <div className="relatedItemsDes">{description}</div>
      </AnimateHeight>
    </a>
  );
}
