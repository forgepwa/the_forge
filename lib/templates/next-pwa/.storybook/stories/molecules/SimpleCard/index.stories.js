import React from "react";
import { storiesOf } from "@storybook/react";
import SimpleCard from "./index.js";

storiesOf("molecules/SimpleCard", module).add("default", () => (
  <SimpleCard title="Default title" description="Default description" />
));
