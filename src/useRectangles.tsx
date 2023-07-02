import { useCallback, useMemo, useState } from "react";

export type RectangleConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
  value: number;
  parentId: `${number}-${number}`;
  id: `${number}-${number}`;
};

type InputState = Pick<RectangleConfig, "value" | "parentId" | "id">[];

const useRectangles = (inputProps: number[]) => {
  const [input, setInput] = useState<InputState>(() =>
    inputProps.map((value, index) => ({
      value,
      id: `${index}-${value}`,
      parentId: `${index}-${value}`,
    }))
  );

  const sum = useMemo(
    () => input.reduce((acc, el) => acc + el.value, 0),
    [input]
  );

  const rectSide = useMemo(() => Math.sqrt(sum), [sum]);

  const list = useMemo(() => {
    return input.reduce<RectangleConfig[]>((acc, input, i) => {
      let height, width, x, y;
      if (i % 2 === 0) {
        height = (acc[i - 2]?.height ?? rectSide) - (acc[i - 1]?.height ?? 0);
        width = input.value / height;
        x = acc[i - 2]?.x + acc[i - 2]?.width || 0;
        y = acc[i - 1]?.y + acc[i - 1]?.height || 0;
      } else {
        width = (acc[i - 2]?.width ?? rectSide) - acc[i - 1].width;
        height = input.value / width;
        x = acc[i - 1]?.x + acc[i - 1]?.width || 0;
        y = acc[i - 2]?.y + acc[i - 2]?.height || 0;
      }
      acc.push({
        height,
        width,
        x,
        y,
        value: input.value,
        parentId: input.parentId,
        id: `${i}-${input.value}`,
      });
      return acc;
    }, []);
  }, [input, rectSide]);

  const split = useCallback(
    ({ value, parentId }: RectangleConfig, index: number) => {
      if (value < 3) {
        return;
      }
      const firstRect = Math.floor(value / 3);
      if (firstRect < 3) {
        return;
      }
      const secondRect = value - firstRect;
      input.splice(
        index,
        1,
        { value: firstRect, parentId, id: `${index}-${firstRect}` },
        { value: secondRect, parentId, id: `${index + 1}-${secondRect}` }
      );
      setInput([...input]);
    },
    [input]
  );

  const revert = useCallback(
    ({ parentId }: RectangleConfig) => {
      let isSet = false;
      setInput(
        input.reduce<Pick<RectangleConfig, "value" | "parentId" | "id">[]>(
          (acc, el) => {
            if (el.parentId !== parentId) {
              acc.push(el);
              return acc;
            }
            if (!isSet) {
              el.value = parseInt(el.parentId.split("-")[1], 10);
              acc.push(el);
              isSet = true;
              return acc;
            }
            return acc;
          },
          []
        )
      );
    },
    [input]
  );

  return { list, split, revert };
};

export default useRectangles;
