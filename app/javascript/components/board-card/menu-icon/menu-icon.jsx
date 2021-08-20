import React, {useState} from 'react';
import style from './menu-icon.module.less';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {api} from '../../api/api';

export const MenuIcon = ({boardSlug}) => {
  const [isOpen, setIsOpen] = useState(false);

  const continueHandler = () => {
    api
      .post(`boards/${boardSlug}/continue`)
      .then((response) => console.log(response));

    setIsOpen(false);
  };

  const historyHandler = () => {
    api
      .get(`boards/${boardSlug}/history`)
      .then((response) => console.log(response));
    api.get(`boards`).then((response) => console.log(response));

    setIsOpen(false);
  };

  const deleteHandler = () => {
    api
      .delete(`boards/${boardSlug}`, {}, {})
      .then((response) => console.log(response));

    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <FontAwesomeIcon
        icon={faEllipsisH}
        size="lg"
        color="#C6C6C4"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={isOpen ? style.openMenu : style.items}>
        <div className={style.item} onClick={continueHandler}>
          continue
        </div>
        <div className={style.item} onClick={historyHandler}>
          history
        </div>
        <div className={style.item} onClick={deleteHandler}>
          delete
        </div>
      </div>
    </div>
  );
};
