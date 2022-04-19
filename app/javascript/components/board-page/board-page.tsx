import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardType } from "../../typings/board";
import { boardApi } from "../api/boards-api";
import { Avatar } from "../avatar/avatar";
import { UserMenu } from "../user-menu/user-menu";
import style from "./style.module.less";
import { Card } from "./card/card";
import { cardApi } from "../api/card-api";
import NewCardBody from "./new-card-body/new-card-body";

export const BoardPage: React.FC = () => {
  const history = useNavigate();
  const params = useParams();

  const [board, setBoard] = useState<BoardType | null>(null);

  useEffect(() => {
    if (params.boardSlug) {
      boardApi.getBoard(params?.boardSlug).then((board) => {
        setBoard(board);
        console.log(board);
      });
    }
  }, []);

  const generateColumns = () =>
    board?.columnNames.map((name, index) => {
      return (
        <div key={index} className={style.itemsColumn}>
          <div className={style.columnHeader}>
            <span>
              {name} {board.columnEmojis[index]}
            </span>
            <NewCardBody kind={name} boardSlug={board.slug} />
          </div>
          <div>
            {board.cardsByType[name].map((card, index) => {
              console.log(card);

              return <Card key={index} {...card} />;
            })}
          </div>
        </div>
      );
    });

  return (
    <div>
      {board && (
        <div className={style.header}>
          <div>
            <div className={style.boardInfo}>
              <FontAwesomeIcon
                icon={faAngleLeft as IconProp}
                size="lg"
                color="#474343"
                className={style.icon}
                onClick={() => history("/boards")}
              />
              <Avatar
                isSquare
                avatar=""
                id={board.id}
                firstName={board.title}
              />
              <div style={{ marginLeft: "10px" }}>
                <div>
                  {board.title}
                  <FontAwesomeIcon
                    icon={faCog as IconProp}
                    size="sm"
                    color="gray"
                    className={style.icon}
                    onClick={() =>
                      alert(
                        "будет перенаправлять на другую страницу или открывать модальное окно"
                      )
                    }
                  />
                </div>
                <div className={style.boardCount}>#{board.boardsCount}</div>
              </div>
            </div>
          </div>
          <div className={style.users}>
            {board.users.map((user) => {
              return (
                <Avatar
                  width={48}
                  height={48}
                  key={user.id}
                  isSquare={false}
                  avatar={user.avatar?.thumb.url}
                  id={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
              );
            })}
            <FontAwesomeIcon
              icon={faPlus as IconProp}
              size="2x"
              color="gray"
              className={style.icon}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("ссылка для приглашения скопирована!");
              }}
            />
          </div>
          <UserMenu />
        </div>
      )}
      <div className={style.itemsContainer}>{generateColumns()}</div>
    </div>
  );
};
