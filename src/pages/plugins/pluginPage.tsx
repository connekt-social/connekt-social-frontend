import { FC, useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PluginDetails, getPlugin } from "../../api/plugins/getPlugins";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "../../utils/toast";
import PluginSettingsForm from "../../components/Plugins/PluginSettingsForm/PluginSettingsForm";

const PluginPage: FC = () => {
  const [plugin, setPlugin] = useState<PluginDetails>();
  const [search, setSearch] = useSearchParams();
  const [tab, setTab] = useState(search.get("tab"));
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (tab) setSearch({ tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (id) {
      getPlugin(id).then(setPlugin).catch(console.error);
    } else {
      toast({
        severity: "error",
        message: "No plugin selected",
      });
    }
  }, [id]);

  return (
    <PageContainer title={plugin?.name ?? "Plugin"}>
      {plugin ? (
        <Card>
          <Tabs
            value={tab}
            onChange={(_, val) => setTab(val)}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tab label="Details" value={"details"} />
            {plugin.settingsSchema && (
              <Tab label="Settings" value={"settings"} />
            )}
          </Tabs>

          <CardContent>
            <Box hidden={tab !== "details"}>
              <Stack spacing={4}>
                <Typography>{plugin.description}</Typography>
                <Stack>
                  <Typography>
                    <strong>Version:</strong> {plugin.version}
                  </Typography>
                  <Typography>
                    <strong>Installation Status:</strong>{" "}
                    {plugin.installationStatus}
                  </Typography>
                  <Typography>
                    <strong>Enabled:</strong> {plugin.enabled ? "Yes" : "No"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            {plugin.settingsSchema && (
              <Box hidden={tab !== "settings"}>
                <Typography>Settings required by {plugin.name}</Typography>
                <PluginSettingsForm plugin={plugin} setPlugin={setPlugin} />
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography> Plugin not found</Typography>
      )}
    </PageContainer>
  );
};

export default PluginPage;
