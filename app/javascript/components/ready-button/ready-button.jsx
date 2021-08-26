import {useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import React, {useContext, useEffect, useState} from 'react';
import BoardSlugContext from '../../utils/board-slug-context';
import {getFullnameOrNickname} from '../../utils/helpers';
import {
  getMembershipQuery,
  membershipUpdatedSubscription,
  toggleReadyStatusMutation
} from './operations.gql';
import style from './style.module.less';

const ReadyButton = ({user}) => {
  const boardSlug = useContext(BoardSlugContext);
  const [isReady, setIsReady] = useState(false);
  const [id, setId] = useState(0);
  const [skipQuery, setSkipQuery] = useState(false);
  const [skipSubscription, setSkipSubscription] = useState(true);
  const {loading, data} = useQuery(getMembershipQuery, {
    variables: {boardSlug},
    skip: skipQuery
  });
  const [toggleReadyStatus] = useMutation(toggleReadyStatusMutation);
  useSubscription(membershipUpdatedSubscription, {
    skip: skipSubscription,
    onSubscriptionData: (options) => {
      const {data} = options.subscriptionData;
      const {membershipUpdated} = data;
      if (membershipUpdated && membershipUpdated.id === id) {
        setIsReady(membershipUpdated.ready);
      }
    },
    variables: {boardSlug}
  });

  useEffect(() => {
    if (!loading && Boolean(data)) {
      const {membership} = data;
      setId(membership.id);
      setIsReady(membership.ready);
      setSkipQuery(true);
    }
  }, [data, loading]);

  useEffect(() => {
    setSkipSubscription(false);
  }, []);

  const handleReadyButtonCLick = async () => {
    const {data} = toggleReadyStatus({
      variables: {
        id
      }
    });

    if (!data.toggleReadyStatus.membership) {
      console.log(data.toggleReadyStatus.errors.fullMessages.join(' '));
    }
  };

  return (
    <button
      className={style.readyButton}
      type="button"
      onClick={handleReadyButtonCLick}
    >
      {isReady
        ? 'Not ready'
        : `Ready, ${getFullnameOrNickname(
            user.firstName,
            user.lastName,
            user.nickname
          )}?`}
    </button>
  );
};

export default ReadyButton;
