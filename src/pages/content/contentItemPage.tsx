import { FC, useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "../../utils/toast";
import { FrontendComponent } from "../../api/plugins/frontend/getComponents";
import camelCaseToSpaced from "../../utils/camelToSpaced";
import DynamicComponentLoader from "../../components/DynamicComponentLoader/DynamicComponentLoader";
import { ContentItem, getContentItem } from "../../api/content/getContentItems";
import dayjs from "dayjs";
import ContentPublishView from "../../components/Content/ContentPublishView/ContentPublishView";

const ContentItemPage: FC = () => {
  const [contentItem, setContentItem] = useState<ContentItem>();
  const [search, setSearch] = useSearchParams();
  const [tab, setTab] = useState(search.get("tab") ?? "details");
  const [components] = useState<FrontendComponent[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (tab) setSearch({ tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (id) {
      getContentItem(id)
        .then((contentItem) => {
          setContentItem(contentItem);

          // getFrontendComponents("PLUGIN_SETTINGS_TAB", id)
          //   .then((components) => {
          //     setComponents(
          //       components.map((component) => component.frontendComponent)
          //     );
          //   })
          //   .catch(console.error);
        })
        .catch(console.error);
    } else {
      toast({
        severity: "error",
        message: "No plugin selected",
      });
    }
  }, [id]);

  const tabs = useMemo(() => {
    return components.map((component, index) => (
      <Tab
        key={index}
        label={camelCaseToSpaced(component.componentName)}
        value={component.componentName}
      />
    ));
  }, [components]);

  const tabContent = useMemo(() => {
    return components.map((component, index) => (
      <Box key={index} hidden={tab !== component.componentName}>
        <DynamicComponentLoader
          url={`${import.meta.env.VITE_API_URL}/plugins/frontend/${component.id}`}
        />
      </Box>
    ));
  }, [tab, components]);

  return (
    <PageContainer title={contentItem?.title ?? "Content Item"}>
      {contentItem ? (
        <>
          <Card>
            <Tabs
              value={tab}
              onChange={(_, val) => setTab(val)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
              centered
            >
              <Tab label="Details" value={"details"} />
              <Tab label="Publish" value={"publish"} />
              {tabs}
            </Tabs>
          </Card>
          <Box hidden={tab !== "details"}>
            <Container
              maxWidth="sm"
              sx={{
                py: 6,
              }}
            >
              <Card>
                <CardContent>
                  <Stack spacing={4}>
                    {contentItem.thumbnail && (
                      <Box
                        component={"img"}
                        src={contentItem.thumbnail}
                        alt="content"
                        sx={{
                          width: "100%",
                          // aspectRatio: size === "large" ? "2/1" : "1/2",
                          objectFit: "cover",
                          height: "auto",
                          maxHeight: "500px",
                        }}
                      />
                    )}

                    <Stack>
                      <Typography variant="h6">{contentItem.title}</Typography>
                      <Typography>{contentItem.caption}</Typography>
                      <Stack
                        spacing={2}
                        direction={{
                          xs: "column",
                          md: "row",
                        }}
                        sx={{
                          justifyContent: {
                            xs: "flex-start",
                            md: "space-between",
                          },
                          alignItems: {
                            xs: "flex-start",
                            md: "center",
                          },
                        }}
                      >
                        <Stack
                          direction={{
                            xs: "column",
                            md: "row",
                          }}
                          spacing={2}
                        >
                          <Chip
                            label={contentItem.contentFormatCode}
                            color="info"
                            variant="outlined"
                            size="small"
                            sx={{ width: "fit-content" }}
                          />
                          {/* {scheduleDate && (
                            <Chip
                              label={
                                "Scheduled for " +
                                dayjs(scheduleDate).format("YYYY/MM/DD")
                              }
                              size="small"
                              sx={{ width: "fit-content" }}
                              color="primary"
                              variant="outlined"
                            />
                          )} */}
                        </Stack>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Last Modified:{" "}
                            {dayjs(contentItem.updatedAt).format("YYYY/MM/DD")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Uploaded on:{" "}
                            {dayjs(contentItem.createdAt).format("YYYY/MM/DD")}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Container>
          </Box>

          <Box hidden={tab !== "publish"}>
            <ContentPublishView contentItem={contentItem} />
          </Box>

          {tabContent}
        </>
      ) : (
        <Typography> Plugin not found</Typography>
      )}
    </PageContainer>
  );
};

export default ContentItemPage;
