import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { actions } from "../../../../redux/boards/slice";
import { BoardType } from "../../../../typings/board";
import { getDate } from "../../../../utils/get-date";
import { boardApi } from "../../../../api/boards-api";
import { Avatar } from "../../../common/avatar/avatar";
import { MenuIcon } from "./menu-icon/menu-icon";
import style from "./style.module.less";

type Props = {
  setIsModal: (isModal: boolean) => void;
  role: string;
  isHistoryBoard: boolean;
  board: BoardType;
  historyBoards: Array<BoardType>;
};

const Board: React.FC<Props> = ({
  role,
  board,
  setIsModal,
  isHistoryBoard,
}) => {
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMenuButtonVisisble, setMenuButtonVisisble] = useState(false);

  const continueBoard = async () => {
    const boards = await boardApi.continueBoard(board.slug);
    if (boards) {
      dispatch(actions.setBoards(boards));
    }
    setMenuButtonVisisble(false);
    setIsOpenMenu(false);
  };

  const historyBoard = async () => {
    const boards = await boardApi.historyBoard(board.slug);
    if (boards) {
      dispatch(actions.setHistoryBoards(boards));
    }
    setMenuButtonVisisble(false);
    setIsOpenMenu(false);
    setIsModal(true);
  };

  const deleteBoard = async () => {
    const boards = await boardApi.deleteBoard(board.slug);
    if (boards) {
      dispatch(actions.setBoards(boards));
    }
    setMenuButtonVisisble(false);
    setIsOpenMenu(false);
  };

  return (
    <div
      className={style.board}
      onMouseEnter={() => {
        setMenuButtonVisisble(true);
      }}
      onMouseLeave={() => {
        setMenuButtonVisisble(false);
      }}
    >
      <div className={style.header}>
        <Avatar isSquare avatar="" id={board.id} firstName={board.title} />
        <span className={style.title}>
          <NavLink to={`/board/${board.slug}`}>{board.title}</NavLink>
        </span>
        {isHistoryBoard && isMenuButtonVisisble && (
          <MenuIcon
            role={role}
            setMenuButtonVisisble={setMenuButtonVisisble}
            continueBoard={continueBoard}
            deleteBoard={deleteBoard}
            historyBoard={historyBoard}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
          />
        )}
      </div>
      <div className={style.footer}>
        <span className={style.textDate}>
          Date of creation:
          {getDate(board.createdAt)}
        </span>
        <span className={style.boardCount}>#{board.boardsCount}</span>
      </div>
    </div>
  );
};

export default Board;
