import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { FC } from "react";
import validator from "@rjsf/validator-ajv8";

type Props = {
  schema: RJSFSchema;
};

const ContentUploadForm: FC<Props> = ({ schema }) => {
  return <Form schema={schema} validator={validator} />;
};

export default ContentUploadForm;
