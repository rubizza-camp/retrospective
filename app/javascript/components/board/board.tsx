import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BoardType } from "../../typings/board";
import { getDate } from "../../utils/get-date";
import { boardApi } from "../api/boards-api";
import { Avatar } from "../avatar/avatar";
import { MenuIcon } from "./menu-icon/menu-icon";
import style from "./style.module.less";

type Props = {
  setHistoryBoards: (boards: Array<BoardType>) => void
  setBoards: (boards: Array<BoardType>) => void
  setIsModal: (isModal: boolean) => void
  role: string
  board: BoardType
  historyBoards: Array<BoardType>
};

const Board: React.FC<Props> = ({
  role,
  board,
  setBoards,
  setIsModal,
  setHistoryBoards,
  historyBoards,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMenuButtonVisisble, setMenuButtonVisisble] = useState(false);

  const continueBoard = async () => {
    const boards = await boardApi.continueBoard(board.slug);
    if (boards) {
      setBoards(boards);
    }

    setIsOpenMenu(false);
  };

  const historyBoard = async () => {
    const boards = await boardApi.historyBoard(board.slug);
    if (boards) {
      setHistoryBoards(boards);
    }

    setIsOpenMenu(false);
    setIsModal(true);
  };

  const deleteBoard = async () => {
    const boards = await boardApi.deleteBoard(board.slug);
    if (boards) {
      setBoards(boards);
    }

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
          <NavLink to={`/board/${board.id}`}>{board.title}</NavLink>
        </span>
        {!historyBoards.length && isMenuButtonVisisble && (
          <MenuIcon
            role={role}
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
