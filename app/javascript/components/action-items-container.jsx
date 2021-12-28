import React, {useEffect, useState} from 'react';
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import uuid from 'uuid';

import {ActionItem} from './action/action-item';
import {actionItemsApi} from './api/action-items-api';
import './style.less';

const ActionItemsContainer = () => {
  const [actionItems, setActionItems] = useState([]);
  const columns = ['pending', 'inProgress', 'done'];

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
      case 'inProgress':
        return 'In progress';
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
                          key={uuid()}
                          draggableId={String(item.id)}
                          index={item.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ActionItem key={uuid()} item={item} />
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
    </div>
  );
};

export default ActionItemsContainer;
