import React from "react";
import { getFullnameOrNickname } from "../../../../../../utils/helpers";
import { Avatar } from "../../../../../common/avatar/avatar";
import style from "./style.module.less";

type PropsType = {
  firstName: string
  lastName: string
  nickName: string
  avatar: string
  id: number
}

const ActionItemAssignee: React.FC<PropsType> = ({
  firstName,
  lastName,
  nickName,
  avatar,
  id,
}) => {
  return (
    <div className={style.assignee}>
      Assigned to
      <div className={style.assigneeUser}>
        <span className={style.assigneeName}>
          {getFullnameOrNickname(firstName, lastName, nickName)}
        </span>
        <div className={style.ava}>
          <Avatar
            avatar={avatar}
            id={id}
            isSquare={false}
            firstName={firstName}
            lastName={lastName}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionItemAssignee;
