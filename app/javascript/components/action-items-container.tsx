import React, { useEffect, useState } from 'react';
import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ActionItemType, ACTION_ITEM_STATUS } from '../typings/actionItem'
import { ActionItem } from './action/action-item';
import { actionItemsApi } from './api/action-items-api';
import './style.less';

const ActionItemsContainer: React.FC = () => {
  const [actionItems, setActionItems] = useState<Array<ActionItemType>>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardId, setCardId] = useState<number | null>(null);
  const columns = [ACTION_ITEM_STATUS.ToDo, ACTION_ITEM_STATUS.InProgress, ACTION_ITEM_STATUS.Done];

  useEffect(() => {
    actionItemsApi
      .getActionItems()
      .then((response) => setActionItems(response));
  }, []);

  const handleOnDragEnd = (items: Array<ActionItemType>) => (result: DropResult) => {
    const { destination } = result;

    if (!destination) {
      return;
    }

    console.log(items, result);
  };

  const getColumnName = (name: string) => {
    switch (name) {
      case ACTION_ITEM_STATUS.ToDo:
        return 'To do';
      case ACTION_ITEM_STATUS.InProgress:
        return 'In-progress';
      case ACTION_ITEM_STATUS.Done:
        return 'Done';
    }
  };

  return (
    <div className="items-container">
      <DragDropContext onDragEnd={handleOnDragEnd(actionItems)}>
        {columns.map((columnName, index) => (
          <div key={index} className="items-column">
            <span className="column-header">{getColumnName(columnName)}</span>
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
      <div className={isModalOpen ? 'modal-visible' : 'modal-hidden'}>
        <div className="modal-content">
          <div>
            <h4>Delete file permanently?</h4>
          </div>
          <div>
            <button
              type="button"
              className="button delete-button"
              onClick={() => {
                setModalOpen(false);
                alert(`delete id ${cardId}`);
              }}
            >
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
