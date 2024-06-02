import { RegistryWidgetsType } from "@rjsf/utils";
import FileUploadTextField from "./FileUploadTextField/FileUploadTextField";

const widgets: RegistryWidgetsType = {
  //custom rjsf widgets
  FileUploadTextField: (props) => <FileUploadTextField {...props} />,
};

export default widgets;
