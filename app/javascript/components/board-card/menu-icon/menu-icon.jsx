import React, {useState} from 'react';
import style from './menu-icon.module.less';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMutation} from 'react-apollo';
import {destroyBoardMutation, continueBoardMutation} from '../operations.gql';

export const MenuIcon = ({boardSlug}) => {
  const [destroyBoard] = useMutation(destroyBoardMutation);
  const [continueBoard] = useMutation(continueBoardMutation);

  const deleteBoard = async () => {
    const {data} = await destroyBoard({
      variables: {
        boardSlug
      }
    });

    if (data.destroyBoard.boardSlug) {
      console.log(data.destroyBoard.errors.fullMessages.join(' '));
    }
  };

  const addBoard = async () => {
    const {data} = await continueBoard({
      variables: {
        boardSlug
      }
    });

    if (data.continueBoard.boardSlug) {
      console.log(data.continueBoard.errors.fullMessages.join(' '));
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const continueHandler = () => {
    addBoard();
    alert('board has been added');
    setIsOpen(false);
  };

  const historyHandler = () => {
    alert('history');
    setIsOpen(false);
  };

  const deleteHandler = () => {
    deleteBoard();
    setIsOpen(false);
    alert('board was deleted');
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
