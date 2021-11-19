import React, {useState} from 'react';
import {PrevActionItemColumn} from './prev-action-item-column';
import {CardColumn} from './card-column';
import {ActionItemColumn} from './action-item-column';
import BoardSlugContext from '../utils/board-slug-context';
import UserContext from '../utils/user-context';
import {Provider} from './provider';
import './style.less';
import {BoardColumnHidden} from './board-column-hidden';

const CardTable = ({
  actionItems,
  cardsByType,
  columnEmojis,
  initPrevItems,
  user,
  userIsCreator,
  users,
  previousBoardSlug
}) => {
  const [isPreviousItemsOpen, setIsPreviousItemsOpen] = useState(
    initPrevItems.length > 0
  );
  const [isActionItemsOpen, setIsActionItemsOpen] = useState(true);

  const togglePreviousItemsOpened = () =>
    setIsPreviousItemsOpen(!isPreviousItemsOpen);

  const toggleActionItemsOpened = () => {
    setIsActionItemsOpen(!isActionItemsOpen);
  };

  const previousActionsEmptyHandler = () => {
    setIsPreviousItemsOpen(false);
  };

  const generateColumns = (cardTypePairs) => {
    const content = [];
    for (const [index, [columnName, cards]] of Object.entries(
      cardTypePairs
    ).entries()) {
      content.push(
        <div key={`${columnName}_column`} className="board-column column">
          <CardColumn
            key={columnName}
            kind={columnName}
            smile={columnEmojis[index]}
            initCards={cards}
          />
        </div>
      );
    }

    return content;
  };

  if (user) {
    user.isCreator = userIsCreator;
  }

  return (
    <Provider>
      <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
        <UserContext.Provider value={user}>
          <div className="board-container">
            {isPreviousItemsOpen ? (
              <div className="board-column column">
                <PrevActionItemColumn
                  handleEmpty={previousActionsEmptyHandler}
                  initItems={initPrevItems || []}
                  users={users}
                  previousBoardSlug={previousBoardSlug}
                  handleToggleClick={togglePreviousItemsOpened}
                />
              </div>
            ) : (
              <BoardColumnHidden
                isLeft
                items={initPrevItems}
                toggleOpen={togglePreviousItemsOpened}
              />
            )}
            {generateColumns(cardsByType)}
            {isActionItemsOpen ? (
              <div className="board-column column">
                <ActionItemColumn
                  initItems={actionItems || []}
                  users={users}
                  handleToggleClick={toggleActionItemsOpened}
                />
              </div>
            ) : (
              <BoardColumnHidden
                toggleOpen={toggleActionItemsOpened}
                items={actionItems}
              />
            )}
          </div>
        </UserContext.Provider>
      </BoardSlugContext.Provider>
    </Provider>
  );
};

export default CardTable;
