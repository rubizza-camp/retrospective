import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import style from "./style.module.less";



type Props = {
  timesMoved: number;
};

export const GenerateChevrons: React.FC<Props> = ({ timesMoved }) => {
  return (
    <>
      {Array.from({ length: timesMoved }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faChevronRight as IconProp}
          size="sm"
          color="#ff000d"
          className={style.chevronRight}
        />
      ))}
    </>
  );
};
