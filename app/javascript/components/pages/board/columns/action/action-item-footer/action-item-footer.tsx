import React from "react";
import { actionItemsApi } from "../../../../../../api/action-items-api";
import TransitionButton from "../transition-button/transition-button";
import "./style.less";

type PropsType = {
  id: number
  isCompletable: boolean;
  currentBoardSlug: string;
}

const ActionItemFooter: React.FC<PropsType> = ({ id, isCompletable, currentBoardSlug }) => {

  const handleMoveClick = async () => {
    await actionItemsApi.moveActionItem(id, { board_slug: currentBoardSlug})
  };

  return (
    <div className="action-item__footer">
      {isCompletable && (
        <>
          <TransitionButton
            id={id}
            action="close"
            className="action-item__button"
          />
          <TransitionButton
            id={id}
            action="complete"
            className="action-item__button"
          />
        </>
      )}
      {isCompletable ? (
        <button
          type="button"
          onClick={() => {
            window.confirm("Are you sure you want to move this ActionItem?") &&
              handleMoveClick();
          }}
        >
          move
        </button>
      ) : (
        <TransitionButton
          id={id}
          action="reopen"
          className="action-item__button"
        />
      )}
    </div>
  );
};

export default ActionItemFooter;
