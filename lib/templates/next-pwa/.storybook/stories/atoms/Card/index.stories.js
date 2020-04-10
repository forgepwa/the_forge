import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Card from "./index.js";

storiesOf("atoms/Card", module)
  .add("default", () => <Card onClick={action("clicked")}>Default</Card>)
  .add("outlined primary", () => (
    <Card variant="outlined" color="primary" onClick={action("clicked")}>
      Outline Primary
    </Card>
  ))
  .add("contained secondary", () => (
    <Card variant="contained" color="secondary" onClick={action("clicked")}>
      Contained Secondary
    </Card>
  ))
  .add("circle Card", () => (
    <Card
      variant="fab"
      color="primary"
      aria-label="Add"
      onClick={action("clicked")}
    >
      CB
    </Card>
  ))
  .add("disabled Card", () => (
    <Card
      variant="contained"
      color="primary"
      onClick={action("clicked")}
      disabled
    >
      Disabled Card
    </Card>
  ));
