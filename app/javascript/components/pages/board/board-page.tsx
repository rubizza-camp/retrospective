import ActionCable from "actioncable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardApi } from "../../../api/boards-api";
import { actions } from "../../../redux/boards/slice";
import { RootState } from "../../../redux/store";
import { BoardType } from "../../../typings/board";
import { Header } from "../../common/header/header";
import { Spinner } from "../../common/spinner/spinner";
import ModalWindow from "../boards/board/modal/modal-window";
import { ActionItemColumn } from "./columns/action/action-item-column/action-item-column";
import { BoardColumnHidden } from "./common/board-column-hidden/board-column-hidden";
import { BoardSetting } from "./board-setting/board-setting";
import { Card } from "./columns/card/card";
import NewCardBody from "./columns/card/new-card-body/new-card-body";
import style from "./style.module.less";
import PreviousActionItemColumn from "./columns/prev-action-item-column/prev-action-item-column";

export const BoardPage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { currentBoard, fetching } = useSelector(
    (state: RootState) => state.board
  );

  const [board, setBoard] = useState<BoardType | null>(currentBoard);
  const [isBoardSettingOpen, setBoardSettingOpen] = useState(false);
  const [isPreviousItemsOpen, setIsPreviousItemsOpen] = useState(true);
  const [isActionItemsOpen, setIsActionItemsOpen] = useState(true);

  const togglePreviousItemsOpened = () =>
    setIsPreviousItemsOpen(!isPreviousItemsOpen);

  const toggleActionItemsOpened = () => {
    setIsActionItemsOpen(!isActionItemsOpen);
  };

  useEffect(() => {
    if (params.boardSlug) {
      dispatch(actions.pending());
      try {
        boardApi.getBoard(params.boardSlug).then((board) => {
          dispatch(actions.setBoard(board));
          setBoard(board);
        });
      } catch {
        dispatch(actions.rejected());
      }
    }
  }, [params.boardSlug]);

  const ActionCableUrl = process.env.URL || 'ws://localhost:3000/cable'

  const cable = ActionCable.createConsumer(ActionCableUrl);

  const createSubscription = () => {
    cable.subscriptions.create(
      { channel: "CardsChannel" },
      {
        received: (data: string) => {
          console.log("ActionCable", JSON.parse(data));
          if (params.boardSlug) {
            boardApi.getBoard(params?.boardSlug).then((board) => {
              setBoard(board);
            });
          }
        },
      }
    );
    cable.subscriptions.create(
      { channel: "ActionItemsChannel" },
      {
        received: (data: string) => {
          console.log(JSON.parse(data).data.actionItem)
          if (params.boardSlug) {
            boardApi.getBoard(params?.boardSlug).then((board) => {
              setBoard(board);
            });
          }
        }
      }
    );
    cable.subscriptions.create(
      { channel: "MembershipsChannel" },
      {
        received: (data: string) => {
          console.log(JSON.parse(data).data.actionItem)
          if (params.boardSlug) {
            boardApi.getBoard(params?.boardSlug).then((board) => {
              setBoard(board);
            });
          }
        }
      }
    );
    cable.subscriptions.create( // seems not working
      { channel: "CommentsChannel" },
      {
        received: (data: string) => {
          if (params.boardSlug) {
            boardApi.getBoard(params?.boardSlug).then((board) => {
              setBoard(board);
            });
          }
        }
      }
    );
  };

  useEffect(() => {
    createSubscription();
  }, []);

  const reloadBoard = () => {
    if (params?.boardSlug) {
      boardApi.getBoard(params?.boardSlug).then((board) => {
        setBoard(board);
      });
    }
  }
  const generateColumns = () =>
    board?.columnNames.map((name, index) => {
      const smile = board.columnEmojis[index];
      return (
        <div key={index} className={style.itemsColumn}>
          <NewCardBody kind={name} smile={smile} boardSlug={board.slug} />
          <div>
            {board.cardsByType[name]?.map((card, index) => {
              return <Card
                key={index}
                smile={smile}
                author={card.author}
                id={card.id}
                body={card.body}
                comments={card.comments}
                likes={card.likes}
                reloadBoard={reloadBoard}
              />
            })}
          </div>
        </div>
      );
    });


  return (
    <div>
      {board && <Header board={board} setBoardSettingOpen={setBoardSettingOpen} />}
      <Spinner
        fetching={fetching}
        styles={{ paddingTop: "20%", paddingLeft: "48%" }}
      >
        <div className={style.itemsContainer}>
          {isPreviousItemsOpen && board ? (
            <div className={style.actionItemsColumn}>
              <PreviousActionItemColumn
                initItems={board.previousActionItems}
                users={board.users}
                previousBoardSlug={board.previousBoardSlug}
                currentBoardSlug={board.slug}
                handleToggleClick={togglePreviousItemsOpened}
              />
            </div>
          ) : (
            <div className={style.actionItemsColumn} >
              <BoardColumnHidden
                isLeft={true}
                items={board?.previousActionItems}
                toggleOpen={togglePreviousItemsOpened}
              />
            </div>
          )}
          <div className={style.cardsColumn}>
            {generateColumns()}
          </div>
          {isActionItemsOpen && board ? (
            <div className={style.actionItemsColumn}>
              <ActionItemColumn
                initItems={board.actionItems}
                users={board.users}
                handleToggleClick={toggleActionItemsOpened}
                nextBoardSlug={board?.nextBoardSlug}
                boardSlug={board.slug}
              />
            </div>
          ) : (
            <div className={style.actionItemsColumn} >
              <BoardColumnHidden isLeft={false} toggleOpen={toggleActionItemsOpened} />
            </div>
          )}
        </div>
      </Spinner >
      {board && isBoardSettingOpen &&
        <ModalWindow closeByButton={false} visible={isBoardSettingOpen} setVisible={setBoardSettingOpen}>
          <BoardSetting
            setBoard={setBoard}
            board={board}
            setBoardSettingOpen={setBoardSettingOpen} />
        </ModalWindow>
      }
    </div >
  );
};
