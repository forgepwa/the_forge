import React from "react";
import { storiesOf } from "@storybook/react";
import SwipableMenu from "./index.js";

storiesOf("molecules/SwipableMenu", module).add("default", () => (
  <SwipableMenu title="Default title" description="Default description" />
));
