import React from 'react';
import {ActionItem} from './action/action-item';
import './style.less';

const ActionItemsContainer = ({actionItems, actionItemsResolved}) => {
  const actiomItemElement = [...actionItems, ...actionItemsResolved].map(
    (item) => {
      return <ActionItem key={item.id} item={item} />;
    }
  );

  return <div className="items-container">{actiomItemElement}</div>;
};

export default ActionItemsContainer;
