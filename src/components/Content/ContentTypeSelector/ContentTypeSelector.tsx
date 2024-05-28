import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ContentType } from "../../../api/content/getContentTypes";

type Props = {
  contentTypes: ContentType[];
  onContentTypeSelect: (contentType: ContentType) => void;
};
const ContentTypeSelector: FC<Props> = ({
  contentTypes,
  onContentTypeSelect,
}) => {
  return (
    <Grid container spacing={2}>
      {contentTypes.map((contentType) => (
        <Grid item key={contentType.id} xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={() => onContentTypeSelect(contentType)}>
              <CardContent>
                <Typography variant="h6">{contentType.name}</Typography>
                <Typography variant="body1">
                  {contentType.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentTypeSelector;
