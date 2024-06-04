import { FC, useEffect, useMemo, useState } from "react";
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
import {
  FrontendComponent,
  getFrontendComponents,
} from "../../api/plugins/frontend/getComponents";
import camelCaseToSpaced from "../../utils/camelToSpaced";
import DynamicComponentLoader from "../../components/DynamicComponentLoader/DynamicComponentLoader";

const PluginPage: FC = () => {
  const [plugin, setPlugin] = useState<PluginDetails>();
  const [search, setSearch] = useSearchParams();
  const [tab, setTab] = useState(search.get("tab") ?? "details");
  const [components, setComponents] = useState<FrontendComponent[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (tab) setSearch({ tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (id) {
      getPlugin(id)
        .then((plugin) => {
          setPlugin(plugin);

          getFrontendComponents("PLUGIN_SETTINGS_TAB", id)
            .then((components) => {
              setComponents(
                components.map((component) => component.frontendComponent)
              );
            })
            .catch(console.error);
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
        {/* <Suspense fallback={<>...</>}>
          {lazy(() =>
            // apiClient
            //   .get(`/plugins/frontend/${component.id}`)
            //   .then((res) => res.data)
            import(
              `${import.meta.env.VITE_API_URL}/plugins/frontend/${component.id}`
            ).then((module) => ({ default: module[component.componentName] }))
          )}
        </Suspense> */}

        <DynamicComponentLoader
          url={`${import.meta.env.VITE_API_URL}/plugins/frontend/${component.id}`}
        />
      </Box>
    ));
  }, [tab, components]);

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
            {tabs}
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
            {tabContent}
          </CardContent>
        </Card>
      ) : (
        <Typography> Plugin not found</Typography>
      )}
    </PageContainer>
  );
};

export default PluginPage;
