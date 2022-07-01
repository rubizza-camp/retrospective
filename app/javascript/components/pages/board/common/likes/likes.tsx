import React from "react";
import { cardApi } from "../../../../../api/card-api";
import style from "./style.module.less";

type PropsType = {
  smile: string
  likes: number
  id: number
  isCard?: boolean
}

export const Likes: React.FC<PropsType> = ({ smile, likes, id, isCard }) => {
  const handleMouseClick = () => {
    cardApi.likeCard(id);
  };

  return (
    <div className={style.likesWrapper} onClick={handleMouseClick}>
      <div>{smile}</div>
      <span> {likes} </span>
    </div>
  );
};
