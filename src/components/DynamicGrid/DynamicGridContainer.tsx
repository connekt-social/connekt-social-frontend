import { Box, SxProps } from "@mui/material";
import { FC, useEffect, useState } from "react";
import gridPlacementFunction, {
  DynamicGridSizes,
} from "../../utils/gridPlacementFunction";

type Props<T extends { size: DynamicGridSizes; sx?: SxProps }> = {
  propList: T[];
  Component: FC<T>;
  spacing?: number;
  sx?: SxProps;
};
const DynamicGridContainer = <
  T extends { size: DynamicGridSizes; sx?: SxProps },
>({
  propList,
  Component,
  sx,
  spacing,
}: Props<T>) => {
  const [gridHeight, setGridHeight] = useState(3);

  useEffect(() => {
    const { matrix } = gridPlacementFunction(propList, 1, 4);
    console.log(matrix);
    setGridHeight(matrix.length);
  }, [propList]);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: (theme) =>
          `repeat(${gridHeight}, ${theme.breakpoints.values.lg / 4}px)`,
        gap: (theme) => theme.spacing(spacing ?? 6),
        ...sx,
      }}
    >
      {propList.map((content) => {
        let sizes: SxProps = {};
        switch (content.size) {
          case "PORTRAIT":
            sizes = {
              gridColumn: "span 1",
              gridRow: "span 2",
            };
            break;
          case "LANDSCAPE":
            sizes = {
              gridColumn: "span 2",
              gridRow: "span 1",
            };
            break;

          case "SQUARE":
          default:
            sizes = {
              gridColumn: "span 1",
              gridRow: "span 1",
            };
            break;
        }

        return (
          <Component
            {...content}
            sx={{
              ...sizes,
              ...content.sx,
            }}
          />
        );
      })}
    </Box>
  );
};
export default DynamicGridContainer;
