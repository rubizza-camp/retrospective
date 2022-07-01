import React from "react";
import { ACTION_ITEM_STATUS } from "../../../../../../typings/actionItem";
import style from "../../../columns/prev-action-item-column/style.module.less";


type PropsType = {
  status: ACTION_ITEM_STATUS;
};

export const LineForAction: React.FC<PropsType> = ({ status }) => {
  return <div className={`${style[status]} ${style.line}`} />;
};
