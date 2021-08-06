import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {destroyMembershipMutation} from './operations.gql';
import {getUserInitials} from '../../utils/helpers';
import avatarStyle from './style.module.less';

const User = ({
  membership: {
    ready,
    id,
    user: {email, avatar, lastName, firstName}
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

  const renderBoardAvatar = (userAvatar, userName, userSurname) => {
    if (userAvatar) {
      return (
        <img
          src={avatar.thumb.url}
          className={`${shouldDisplayReady && ready ? 'isReady' : ''} avatar`}
          alt={email}
          title={email}
        />
      );
    }

    let classes = `${avatarStyle.avatar} ${avatarStyle.avatarText}
      ${avatarStyle[`avatar-${id % 10}`]}`;
    shouldDisplayReady && ready && (classes += avatarStyle.isReady);

    return (
      <div className={classes}>{getUserInitials(userName, userSurname)}</div>
    );
  };

  return (
    <div key={email} className={avatarStyle.avatarWrapper}>
      {renderBoardAvatar(avatar.thumb.url, firstName, lastName)}
      <div className={avatarStyle.avatarTooltip}>
        {firstName} {lastName}
      </div>
      {shouldHandleDelete && (
        <a className="delete is-small" onClick={deleteUser} />
      )}
    </div>
  );
};

export default User;
