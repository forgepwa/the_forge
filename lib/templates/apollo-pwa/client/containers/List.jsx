import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { READ_TODOS } from "../components/Main.jsx";

export default function ItemList(props) {
  //TODO: retrieving todoitems from db
  const { createTodo, removeTodo } = props;
  const [checked, setChecked] = useState([0]);
  // const [todos, setTodos] = useState(data.todos);
  const { data } = useQuery(READ_TODOS);
  const [text, setText] = useState("");
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
    // let list = todoItems.slice();
    // list.push({ name: newItem, done: false });
    // setToDoItems(list);
    createTodo({ variables: { name: newItem } });
    setText("");
  };
  return (
    <List>
      {data.todos.map((item, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <>
            <Divider />
            <ListItem
              key={`item-${item.name}-${index}`}
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                {/* <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                /> */}
              </ListItemIcon>
              <ListItemText primary={`${item.name}`} />
              <button
                onClick={() => removeTodo({ variables: { id: item.id } })}
              >
                X
              </button>
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
