import {useMutation} from '@apollo/react-hooks';
import React from 'react';
import {getFullnameOrNickname} from '../../utils/helpers';
import {Avatar} from '../avatar/avatar';
import {destroyMembershipMutation} from './operations.gql';
import avatarStyle from './style.module.less';

const User = ({
  membership: {
    ready,
    id,
    user: {id: userId, email, avatar, lastName, firstName, nickname}
  },
  shouldDisplayReady,
  shouldHandleDelete
}) => {
  const [destroyMember] = useMutation(destroyMembershipMutation);
  const deleteUser = async () => {
    const {data} = await destroyMember({
      variables: {
        id
      }
    });

    if (data.destroyMembership.id) {
      console.log(data.destroyMembership.errors.fullMessages.join(' '));
    }
  };

  const classes =
    shouldDisplayReady && ready
      ? `${avatarStyle.avatar} ${avatarStyle.isReady}`
      : `${avatarStyle.avatar}`;

  return (
    <div key={email} className={avatarStyle.avatarWrapper}>
      <div className={classes}>
        <Avatar
          isSquare
          avatar={avatar.thumb.url}
          id={userId}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
      <div className={avatarStyle.avatarTooltip}>
        <span> ^ </span>
        <span>{getFullnameOrNickname(firstName, lastName, nickname)}</span>
      </div>
      {shouldHandleDelete && (
        <a className="delete is-small" onClick={deleteUser} />
      )}
    </div>
  );
};

export default User;
