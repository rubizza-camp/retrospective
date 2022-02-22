import React, { useState } from "react";
import { ActionItemType } from "../../typings/actionItem";
import { getFullnameOrNickname } from "../../utils/helpers";
import { Avatar } from "../avatar/avatar";
import style from "./style.module.less";

type Props = {
  item: ActionItemType;
  deleteCallback: () => void;
};

export const ActionItem: React.FC<Props> = ({ item, deleteCallback }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);
  return (
    <div
      className={`${style[item.status]} ${style.item}`}
      onMouseOver={() => {
        setDeleteButtonVisible(true);
      }}
      onMouseOut={() => {
        setDeleteButtonVisible(false);
      }}
    >
      <div className={style.header}>
        <Avatar
          isSquare
          width={24}
          height={24}
          avatar=""
          id={3}
          firstName="board title"
        />
        <span className={style.title}>board.title</span>
        <span
          className={
            isDeleteButtonVisible ? style.closeButtonVisible : style.closeButton
          }
          onClick={() => {
            deleteCallback();
          }}
        >
          &times;
        </span>
      </div>
      <div className={isHidden ? style.showContent : style.content}>
        {item.body}
      </div>
      {isHidden ||
        (item.body.length >= 155 && (
          <div className={style.text} onClick={() => setIsHidden(true)}>
            see more
          </div>
        ))}
      <div className={style.footer}>
        <span className={style.text}>Assigned by</span>
        <div className={style.author}>
          <div className={style.authorName}>
            {getFullnameOrNickname(
              item.author.firstName,
              item.author.lastName,
              item.author.nickname
            )}
          </div>
          <div className={style.authorAvatar}>
            <Avatar
              avatar={item.author.avatar.url}
              id={item.id}
              isSquare={false}
              firstName={item.author.firstName}
              lastName={item.author.lastName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
