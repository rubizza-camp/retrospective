import React, { CSSProperties } from "react";
import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular";
import style from "./style.module.less";

type Props = {
  fetching: boolean;
  styles?: CSSProperties;
};

export const Spinner: React.FC<Props> = ({ fetching, children, styles }) => {
  return (
    <>
      {fetching && (
        <div className={style.wrapper} style={styles}>
          <SpinnerCircular
            size={60}
            thickness={180}
            speed={100}
            color="rgba(57, 66, 172, 1)"
            secondaryColor="rgba(0, 0, 0, 0.5)"
          />
        </div>
      )}
      {children}
    </>
  );
};
