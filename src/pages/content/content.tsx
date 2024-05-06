import PageContainer from "../../components/PageContainer/PageContainer";
import ContentCard from "../../components/ContentCard/ContentCard";
import dayjs from "dayjs";
import { Grid } from "@mui/material";

const ContentPage = () => {
  return (
    <PageContainer title="Content">
      <Grid container>
        <ContentCard
          createdAt={dayjs()}
          itemID="12345"
          itemType="Type"
          title="Hello World"
          updatedAt={dayjs()}
          description="Wow"
          size="small"
        />
      </Grid>
    </PageContainer>
  );
};

export default ContentPage;
