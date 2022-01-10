import React, {useEffect, useState} from 'react';
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import uuid from 'uuid';

import {ActionItem} from './action/action-item';
import {actionItemsApi} from './api/action-items-api';
import './style.less';

const ActionItemsContainer = () => {
  const [actionItems, setActionItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardId, setCardId] = useState(null);
  const columns = ['pending', 'in_progress', 'done'];

  useEffect(() => {
    actionItemsApi
      .getActionItems()
      .then((response) => setActionItems(response));
  }, []);

  const handleOnDragEnd = (items) => (result) => {
    const {destination} = result;

    if (!destination) {
      return;
    }

    console.log(items, result);
  };

  const getColumnName = (name) => {
    switch (name) {
      case 'pending':
        return 'To do';
      case 'in_progress':
        return 'In-progress';
      case 'done':
        return 'Done';
    }
  };

  return (
    <div className="items-container">
      <DragDropContext onDragEnd={handleOnDragEnd(actionItems)}>
        {columns.map((columnName) => (
          <div key={uuid()} className="items-column">
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
