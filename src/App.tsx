import { useCallback, useMemo, useState } from "react";
import { Rectangle } from "./Rectangle";
import useRectangles from "./useRectangles";

const defaultInput = [100, 45, 21, 60, 24];

function App() {
  const { list, split, revert } = useRectangles(defaultInput);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {list.map((props, i) => (
        <Rectangle
          key={props.id}
          {...props}
          onClick={() => {
            split(props, i);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            revert(props);
          }}
        />
      ))}
    </div>
  );
}

export default App;
