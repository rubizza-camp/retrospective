import React, {useState, useEffect, useContext} from 'react';
import { cardApi } from '../../api/card-api';
import style from './style.module.less';
// import UserContext from '../../utils/user-context';
const EMOJIES = {
  mad: '😡',
  sad: '😔',
  glad: '🤗',
  universal: '👍'
};

export const Likes = ({type, likes, id, isCard}: any) => {
  const handleMouseClick = () => {
    cardApi.likeCard(id);
  };

  return (
    <div className={style.likesWrapper}
      onClick={handleMouseClick}
    >
      <div>{EMOJIES.universal}</div>
      <span> {likes} </span>
    </div>
  );
};
