import { Grid } from "@mui/material";
import ContentCard from "../../components/ContentCard/ContentCard";
import dayjs from "dayjs";
import imageSrc from "../../stories/assets/figma-plugin.png";

const HomePage = () => {
  return (
    <Grid container>
      <ContentCard
        createdAt={dayjs()}
        updatedAt={dayjs()}
        itemID="s"
        itemType="Type"
        title="Content card"
        description="This is a content card"
        imageSrc={imageSrc}
        scheduleDate={dayjs()}
        size="large"
      />
    </Grid>
  );
};

export default HomePage;
