import React from 'react';
import {Avatar} from '../avatar/avatar';

export const UsersAvatars = ({users}) => {
  return users.map((user) => (
    <Avatar
      key={user.id}
      avatar={user.avatar.url}
      id={user.id}
      isSquare={false}
      firstName={user.firstName}
      lastName={user.lastName}
    />
  ));
};
