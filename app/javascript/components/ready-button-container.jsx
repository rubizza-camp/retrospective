import React from 'react';
import {ReadyButton} from './ready-button';
import {Provider} from './provider';
import BoardSlugContext from '../utils/board-slug-context';

const ReaduButtonContainer = ({user}) => {
  return (
    <Provider>
      <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
        <ReadyButton user={user} />
      </BoardSlugContext.Provider>
    </Provider>
  );
};

export default ReaduButtonContainer;
