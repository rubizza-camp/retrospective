import React from 'react';
import BoardCard from './board-card/board-card';
import {Provider} from './provider';

const BoardCardContainer = ({board, users}) => {
  return (
    <Provider>
      <BoardCard board={board} users={users} />
    </Provider>
  );
};

export default BoardCardContainer;
