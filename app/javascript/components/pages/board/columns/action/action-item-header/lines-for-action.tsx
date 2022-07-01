import React from "react";
import { ActionItemType } from "../../../../../../typings/actionItem";
import style from "../../../columns/prev-action-item-column/style.module.less";
import { LineForAction } from "./line-for-action";

type PropsType = {
  actionItems?: ActionItemType[]
  prevActionItems?: ActionItemType[]
  hiddenActionItem?: boolean
};

export const LinesForAction: React.FC<PropsType> = ({
  actionItems,
  prevActionItems,
  hiddenActionItem,
}) => {
  if (prevActionItems) {
    return (
      <div className={hiddenActionItem ? style.hiddenItems : style.items}>
        {prevActionItems.map((element: ActionItemType) => (  
          <LineForAction key={element.id} status={element.status} />
        ))}
      </div>
    );
  }

  return (
    <div className={style.items}>
      {actionItems?.map((element: ActionItemType) => (
        <LineForAction key={element.id} status={element.status} />
      ))}
    </div>
  );
};
