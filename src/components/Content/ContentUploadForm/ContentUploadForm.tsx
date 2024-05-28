import Form from "@rjsf/mui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { FC } from "react";
import validator from "@rjsf/validator-ajv8";
import { IChangeEvent } from "@rjsf/core";

type Props = {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  onSubmit?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: IChangeEvent<any, RJSFSchema, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: React.FormEvent<any>
  ) => void;
};

const ContentUploadForm: FC<Props> = ({ schema, uiSchema, onSubmit }) => {
  return (
    <Form
      schema={schema}
      uiSchema={{
        "ui:submitButtonOptions": {
          submitText: "Next",
        },
        ...uiSchema,
      }}
      validator={validator}
      onSubmit={
        onSubmit
          ? onSubmit
          : (data) => {
              console.log("contentUploadForm submitted", data);
            }
      }
    />
  );
};

export default ContentUploadForm;
