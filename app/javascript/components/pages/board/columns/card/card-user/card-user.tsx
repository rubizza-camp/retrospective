import React from "react";
import { UserAvatar } from "../../../../../../typings/user";
import { getFullnameOrNickname } from "../../../../../../utils/helpers";
import { Avatar } from "../../../../../common/avatar/avatar";
import "./style.less";

type PropsType = {
  firstName: string
  lastName: string
  nickname: string
  avatar: UserAvatar
  id: number
}
export const CardUser: React.FC<PropsType> = ({
  firstName,
  lastName,
  nickname,
  avatar,
  id,
}) => {
  const url = avatar?.url;
  return (
    <div className="avatar__container">
      <Avatar
        avatar={url}
        id={id}
        isSquare={false}
        firstName={firstName}
        lastName={lastName}
      />
      <span className="avatar__nickname">
        {getFullnameOrNickname(firstName, lastName, nickname)}
      </span>
    </div>
  );
};
