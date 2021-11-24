import React, {useContext} from 'react';
import {useMutation} from '@apollo/react-hooks';
import BoardSlugContext from '../../utils/board-slug-context';
import {
  closeActionItemMutation,
  completeActionItemMutation,
  reopenActionItemMutation
} from './operations.gql';

const TransitionButton = ({id, action}) => {
  const boardSlug = useContext(BoardSlugContext);

  const [closeActionItem] = useMutation(closeActionItemMutation);
  const [completeActionItem] = useMutation(completeActionItemMutation);
  const [reopenActionItem] = useMutation(reopenActionItemMutation);

  const handleClick = async () => {
    let response;
    switch (action) {
      case 'close':
        response = await closeActionItem({
          variables: {
            id,
            boardSlug
          }
        });

        if (!response.data.closeActionItem.actionItem) {
          console.log(
            response.data.closeActionItem.errors.fullMessages.join(' ')
          );
        }

        break;

      case 'complete':
        response = await completeActionItem({
          variables: {
            id,
            boardSlug
          }
        });

        if (!response.data.completeActionItem.actionItem) {
          console.log(
            response.data.completeActionItem.errors.fullMessages.join(' ')
          );
        }

        break;

      case 'reopen':
        response = await reopenActionItem({
          variables: {
            id,
            boardSlug
          }
        });

        if (!response.data.reopenActionItem.actionItem) {
          console.log(
            response.data.reopenActionItem.errors.fullMessages.join(' ')
          );
        }

        break;
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {action}
    </button>
  );
};

export default TransitionButton;
