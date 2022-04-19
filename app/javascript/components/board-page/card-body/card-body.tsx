import React, {useEffect, useState} from 'react';
import {CardUser} from '../card-user/card-user';
import style from './style.module.less';

export const CardBody = ({author, id, body}: any) => {

  return (
    <div className={style.cardBody}>
      <div className={style.top}>
        <CardUser {...author} />
      </div>
      <div
        className={style.cardText}
      >
        {body}
      </div>
    </div>
  );
};
