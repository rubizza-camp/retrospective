import React from "react";
import { actionItemsApi } from "../../../../../../api/action-items-api";

type PropsType = {
  id: number
  action: string
  className: string
}

const TransitionButton: React.FC<PropsType> = ({ id, action, className }) => {
  const handleClick = async () => {

    // closed done pending in_progress

    switch (action) {
      case "close":
        actionItemsApi.changeActionItemStatus(id, 'closed')
        break;

      case "complete":
        actionItemsApi.changeActionItemStatus(id, 'done')

        break;

      case "reopen":
        actionItemsApi.changeActionItemStatus(id, 'pending')

        break;
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {action}
    </button>
  );
};

export default TransitionButton;
