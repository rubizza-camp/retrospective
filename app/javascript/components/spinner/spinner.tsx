import React, { CSSProperties } from "react";
import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular";
import style from "./style.module.less";

type Props = {
  fetching: boolean;
  styles: CSSProperties;
};

export const Spinner: React.FC<Props> = ({ fetching, children, styles }) => {
  return (
    <>
      {fetching && (
        <div className={style.wrapper} style={styles}>
          <SpinnerCircular />
        </div>
      )}
      {children}
    </>
  );
};
