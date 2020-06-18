import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ItemList from "../containers/List.jsx";

// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

export default function ToDoList(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="To Do List" subheader="September 14, 2016" />
      <CardContent>
        <ItemList />
      </CardContent>
    </Card>
  );
}
