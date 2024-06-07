import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ContentFormat } from "../../../api/content/getContentFormats";

type Props = {
  contentFormats: ContentFormat[];
  onContentFormatSelect: (contentFormat: ContentFormat) => void;
};
const ContentFormatSelector: FC<Props> = ({
  contentFormats,
  onContentFormatSelect,
}) => {
  return (
    <Grid container spacing={2}>
      {contentFormats.map((contentFormat) => (
        <Grid item key={contentFormat.code} xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea
              onClick={() => onContentFormatSelect(contentFormat)}
            >
              <CardContent>
                <Typography variant="h6">{contentFormat.name}</Typography>
                <Typography variant="body1">
                  {contentFormat.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentFormatSelector;
