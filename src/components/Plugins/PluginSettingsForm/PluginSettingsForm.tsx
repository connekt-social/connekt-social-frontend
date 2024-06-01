import Form from "@rjsf/mui";
import { Dispatch, FC, SetStateAction, useState } from "react";
import validator from "@rjsf/validator-ajv8";
import { PluginDetails } from "../../../api/plugins/getPlugins";
import { updatePluginSettings } from "../../../api/plugins/pluginSettings";
import { CircularProgress } from "@mui/material";
import { toast } from "../../../utils/toast";

type Props = {
  plugin: PluginDetails;
  setPlugin: Dispatch<SetStateAction<PluginDetails | undefined>>;
};

const PluginSettingsForm: FC<Props> = ({ plugin, setPlugin }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: object) => {
    setLoading(true);
    try {
      const newSettings = await updatePluginSettings(plugin.id, data);
      setPlugin({ ...plugin, settings: newSettings });
      toast({
        message: "Settings saved successfully",
        severity: "success",
      });
    } catch (error) {
      console.log("failed to save settings", error);
    }
    setLoading(false);
  };
  return (
    <Form
      schema={plugin?.settingsSchema ?? {}}
      uiSchema={{
        "ui:submitButtonOptions": {
          submitText: "Save",
          props: {
            disabled: loading,
            startIcon: loading && <CircularProgress size={16} />,
          },
        },
      }}
      formData={plugin?.settings}
      validator={validator}
      onSubmit={(data) => {
        console.log("settings submitted", data);
        handleSubmit(data.formData);
      }}
    />
  );
};

export default PluginSettingsForm;
