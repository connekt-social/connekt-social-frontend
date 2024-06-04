import { FC } from "react";
import { useRemoteComponent } from "./useRemoteComponent";

// const url = "https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js"; // prettier-ignore

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

const DynamicComponentLoader: FC<Props> = ({ url, ...props }) => {
  const [loading, err, Component] = useRemoteComponent(
    url,
    "AccountLinkingTab"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err != null) {
    return <div>Unknown Error: {err.toString()}</div>;
  }

  return <Component {...props} />;
};

export default DynamicComponentLoader;
