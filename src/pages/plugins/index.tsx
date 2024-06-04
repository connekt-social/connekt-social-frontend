import { FC, useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PluginDetails, getPlugins } from "../../api/plugins/getPlugins";
import { Extension } from "@mui/icons-material";

const PluginsPage: FC = () => {
  const [plugins, setPlugins] = useState<PluginDetails[]>([]);

  useEffect(() => {
    getPlugins().then(setPlugins).catch(console.error);
  }, []);

  return (
    <PageContainer title="Plugins">
      <Grid container spacing={6}>
        {plugins.map((plugin) => (
          <Grid item key={plugin.id} xs={12} md={6} lg={4}>
            <Card>
              <CardActionArea href={`/plugins/${plugin.id}`}>
                <Stack direction="row">
                  <Box
                    sx={{
                      width: "30%",
                      aspectRatio: "1/1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    {plugin.logoUrl ? (
                      <Box
                        component={"img"}
                        src={plugin.logoUrl}
                        alt={plugin.name}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <Extension
                        sx={{
                          fontSize: 100,
                          color: "text.secondary",
                        }}
                      />
                    )}
                  </Box>
                  <Stack>
                    <CardHeader title={plugin.name} />
                    <CardContent>
                      <Typography>{plugin.description}</Typography>
                    </CardContent>
                  </Stack>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default PluginsPage;
