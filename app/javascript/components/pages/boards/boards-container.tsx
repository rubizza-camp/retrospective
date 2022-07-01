import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/boards/slice";
import { RootState } from "../../../redux/store";
import { ROLE } from "../../../typings/board";
import { boardApi } from "../../../api/boards-api";
import Board from "./board/board";
import ModalWindow from "./board/modal/modal-window";
import style from "./board/style.module.less";
import { CreateBoard } from "./create-board/create-board";
import { Spinner } from "../../common/spinner/spinner";
import "../../style.less";

const BoardsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { boards, historyBoards, role, fetching } = useSelector(
    (state: RootState) => state.board
  );

  const [isModal, setIsModal] = useState(false);
  const [isCreateBoardOpen, setCreateBoardOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.pending());
    try {
      if (role === ROLE.Creator) {
        boardApi.getBoards().then((boards) => {
          dispatch(actions.setBoards(boards));
        });
      } else {
        boardApi.getBoardsWhereIAm().then((boards) => {
          dispatch(actions.setBoards(boards));
        });
      }
    } catch {
      dispatch(actions.rejected());
    }
  }, [role]);

  return (
    <div className={style.boardContainer}>
      <ModalWindow closeByButton={true} visible={isModal} setVisible={setIsModal}>
        {historyBoards.map((board) => (
          <Board
            key={board.id}
            isHistoryBoard={false}
            role={role}
            setIsModal={setIsModal}
            historyBoards={historyBoards}
            board={board}
          />
        ))}
      </ModalWindow>
      <button
        className={style.createButton}
        type="button"
        onClick={() => {
          setCreateBoardOpen(true);
        }}
      >
        <FontAwesomeIcon
          icon={faPlus as IconProp}
          size="sm"
          color="#474343"
          style={{ marginRight: "8px" }}
        />
        New board
      </button>
      <div className={style.buttons}>
        <button
          className={
            role === ROLE.Creator
              ? `${style.activeButton} ${style.button}`
              : style.button
          }
          type="button"
          onClick={() => dispatch(actions.setRole(ROLE.Creator))}
        >
          My Boards
        </button>
        <button
          className={
            role === ROLE.Participating
              ? `${style.activeButton} ${style.button}`
              : style.button
          }
          type="button"
          onClick={() => dispatch(actions.setRole(ROLE.Participating))}
        >
          Boards where I am
        </button>
      </div>
      <Spinner
        fetching={fetching}
        styles={{ paddingTop: "5%", paddingLeft: "20%" }}
      >
        <div className={style.boards}>
          {boards.map((board) => (
            <Board
              key={board.id}
              role={role}
              isHistoryBoard={true}
              setIsModal={setIsModal}
              historyBoards={historyBoards}
              board={board}
            />
          ))}
        </div>
      </Spinner>
      <CreateBoard
        isCreateBoardOpen={isCreateBoardOpen}
        setCreateBoardOpen={setCreateBoardOpen}
      />
    </div>
  );
};

export default BoardsContainer;
