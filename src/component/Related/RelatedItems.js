import React from "react";
import "./related.scss";

export default function RelatedItems(props) {
  const { url, name, description,imgSrc } = props;
  return (
    <a className="relatedItemParent" href={url}>
      <div className='relatedItemName'>{name}</div>
      <div className='relatedItemsDes'>{description}</div>
      <img className='relatedItemImg' width='90' height='90' src={imgSrc} alt='world health organization'></img>
    </a>
  );
}
