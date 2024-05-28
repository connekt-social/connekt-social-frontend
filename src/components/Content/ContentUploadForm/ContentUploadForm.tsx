import Form from "@rjsf/mui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { FC } from "react";
import validator from "@rjsf/validator-ajv8";

type Props = {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
};

const ContentUploadForm: FC<Props> = ({ schema, uiSchema }) => {
  return <Form schema={schema} uiSchema={uiSchema} validator={validator} />;
};

export default ContentUploadForm;
