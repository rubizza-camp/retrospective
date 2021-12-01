import React, {useEffect, useState} from 'react';
import {ActionItem} from './action/action-item';
import {actionItemsApi} from './api/action-items-api';
import './style.less';

const ActionItemsContainer = () => {
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    actionItemsApi
      .getActionItems()
      .then((response) => setActionItems(response));
  }, []);

  return (
    <div className="items-container">
      {actionItems.map((item) => {
        return (
          item.status !== 'closed' && (
            <ActionItem
              key={item.id}
              item={item}
              setActionItems={setActionItems}
            />
          )
        );
      })}
    </div>
  );
};

export default ActionItemsContainer;
