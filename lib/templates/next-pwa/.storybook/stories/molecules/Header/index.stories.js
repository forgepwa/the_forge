import React from "react";
import { storiesOf } from "@storybook/react";
import Header from "./index.js";

storiesOf("molecules/Header", module).add("default", () => (
  <Header title="Default title" description="Default description" />
));
