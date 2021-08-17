import React from 'react';
import BoardSlugContext from '../utils/board-slug-context';
import BoardCard from './board-card/board-card';
import {Provider} from './provider';

const BoardCardContainer = ({board, users}) => {
  return (
    <Provider>
      <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
        <BoardCard board={board} users={users} />
      </BoardSlugContext.Provider>
    </Provider>
  );
};

export default BoardCardContainer;
