import { MouseEventHandler } from "react";
import { RectangleConfig } from "./useRectangles";

export type RectangleProps = RectangleConfig & {
  onClick: MouseEventHandler;
  onContextMenu: MouseEventHandler;
};

const scale = 40;

export const Rectangle = ({
  width,
  height,
  x,
  y,
  value,
  onClick,
  onContextMenu,
}: RectangleProps) => {
  return (
    <div
      className="content"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        border: "1px solid rgba(0, 0, 0, 0.25)",
        top: `${y * scale}px`,
        left: `${x * scale}px`,
      }}
    >
      <strong>{value}</strong>
    </div>
  );
};
