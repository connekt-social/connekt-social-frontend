import { Card } from "@mui/material";
import { useEffect, useState } from "react";

const ContentTypeSelector = ({ children }) => {
  const [gridHeight, setGridHeight] = useState(1);

  useEffect(() => {}, [children]);

  return <Card></Card>;
};

export default ContentTypeSelector;
