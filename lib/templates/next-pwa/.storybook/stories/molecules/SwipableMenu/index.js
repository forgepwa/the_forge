import React from "react";
import PropTypes from "prop-types";
import SwipableDrawer from "../../atoms/SwipableDrawer/index.js";
import List from "../../atoms/List/index.js";
import ListItem from "../../atoms/ListItem/index.js";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SwipableMenu = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawerOpen: true,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, drawerOpen: open });
  };

  return (
    <div
      className={classes.root}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <SwipableDrawer open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipableDrawer>
    </div>
  );
};

export default SwipableMenu;
