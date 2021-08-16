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
  shouldHandleDelete,
  amount
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
    let avatarClasses = `${
      shouldDisplayReady && ready && avatarStyle.isReady
    } ${avatarStyle.avatar} ${amount > 5 && avatarStyle.avatarHugePeople}`;

    if (userAvatar) {
      return (
        <img
          src={avatar.thumb.url}
          className={avatarClasses}
          alt={email}
          title={email}
        />
      );
    }

    avatarClasses += ` ${avatarStyle.avatarText} ${
      avatarStyle[`avatar-${id % 10}`]
    }`;

    return (
      <div className={avatarClasses}>
        {getUserInitials(userName, userSurname)}
      </div>
    );
  };

  return (
    <div key={email} className={avatarStyle.avatarWrapper}>
      {renderBoardAvatar(avatar.thumb.url, firstName, lastName)}
      <div className={avatarStyle.avatarTooltip}>
        <span> ^ </span>
        <span>
          {firstName} {lastName}
        </span>
      </div>
      {shouldHandleDelete && (
        <a className="delete is-small" onClick={deleteUser} />
      )}
    </div>
  );
};

export default User;
