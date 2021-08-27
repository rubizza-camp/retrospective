import React from 'react';
import BoardCard from './board-card/board-card';

const BoardCardContainer = ({board, users}) => {
  return <BoardCard board={board} users={users} />;
};

export default BoardCardContainer;
