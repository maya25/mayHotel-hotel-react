import React from "react";
import classNames from "classnames";
import "./Box.scss";

const Box = ({ children, className, isFluid, content, ...props }) => (
  <div
    {...props}
    className={classNames(
      "site-box",
      className,
      { "site-box-fluid": isFluid },
      { content: content }
    )}
  >
    {children}
  </div>
);

export default Box;
