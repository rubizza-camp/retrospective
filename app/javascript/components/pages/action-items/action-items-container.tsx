import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/action-items/slice";
import { RootState } from "../../../redux/store";
import {
  ActionItemType,
  ACTION_ITEM_STATUS,
} from "../../../typings/actionItem";
import { ActionItem } from "./action/action-item";
import { actionItemsApi } from "../../../api/action-items-api";
import { Spinner } from "../../common/spinner/spinner";
import "../../style.less";
import style from "./style.module.less";


const ActionItemsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { actionItems, fetching } = useSelector(
    (state: RootState) => state.actionItem
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [cardId, setCardId] = useState<number | null>(null);
  const columns = [
    ACTION_ITEM_STATUS.ToDo,
    ACTION_ITEM_STATUS.InProgress,
    ACTION_ITEM_STATUS.Done,
  ];

  useEffect(() => {
    dispatch(actions.pending());
    try {
      actionItemsApi.getActionItems().then((response) => {
        dispatch(actions.setActionItems(response));
      });
    } catch {
      dispatch(actions.rejected());
    }
  }, []);

  const handleOnDragEnd =
    (items: Array<ActionItemType>) => (result: DropResult) => {
      const { destination, draggableId } = result;

      if (!destination) {
        return;
      }
      dispatch(actions.pending());
      try {
        actionItemsApi
          .changeActionItemStatus(Number(draggableId), destination.droppableId)
          .then((response) => dispatch(actions.setActionItems(response)));
      } catch {
        dispatch(actions.rejected());
      }
    };

  const handleDeleteItem = () => {
    setModalOpen(false);
    dispatch(actions.pending());
    try {
      actionItemsApi
        .changeActionItemStatus(Number(cardId), ACTION_ITEM_STATUS.Closed)
        .then((response) => dispatch(actions.setActionItems(response)));
    } catch {
      dispatch(actions.rejected());
    }
  };

  const getColumnName = (name: string) => {
    switch (name) {
      case ACTION_ITEM_STATUS.ToDo:
        return "To do";
      case ACTION_ITEM_STATUS.InProgress:
        return "In progress";
      case ACTION_ITEM_STATUS.Done:
        return "Done";
    }
  };

  return (
    <div className={style.itemsContainer}>
      <Spinner
        fetching={fetching}
        styles={{ paddingTop: "20%", paddingLeft: "48%" }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd(actionItems)}>
          {columns.map((columnName, index) => (
            <div key={index} className={style.itemsColumn}>
              <span className={style.columnHeader}>{getColumnName(columnName)}</span>
              <Droppable droppableId={columnName}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {actionItems.map((item) => {
                      if (item.status === columnName) {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={item.id}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ActionItem
                                  key={item.id}
                                  deleteCallback={() => {
                                    setModalOpen(true);
                                    setCardId(item.id);
                                  }}
                                  item={item}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      }

                      return null;
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </Spinner>
      <div className={isModalOpen ? "modal-visible" : "modal-hidden"}>
        <div className="modal-content">
          <div>
            <h4>Delete file permanently?</h4>
          </div>
          <div>
            <button className="button delete-button" onClick={handleDeleteItem}>
              Delete
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsContainer;
