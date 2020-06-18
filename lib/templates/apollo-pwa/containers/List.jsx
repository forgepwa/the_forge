import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ItemList() {
  const [checked, setChecked] = useState([0]);
  const [text, setText] = useState("");
  const [todoItems, setToDoItems] = useState([
    { name: "Study", done: false },
    { name: "Take care", done: false },
  ]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleValue = (event) => {
    setText(event.target.value);
  };

  const addTodoItem = (newItem) => {
    let list = todoItems.slice();
    list.push({ name: newItem, done: false });
    setToDoItems(list);
    setText("");
  };
  return (
    <List>
      {todoItems.map((item, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <>
            <Divider />
            <ListItem
              key={`item-${item.name}-${index}`}
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={`${item.name}`} />
            </ListItem>
          </>
        );
      })}
      <TextField
        id="standard-name"
        label="Add To Do"
        value={text}
        onChange={handleValue}
      />
      <Button onClick={() => addTodoItem(text)}>Save To Do</Button>
    </List>
  );
}
