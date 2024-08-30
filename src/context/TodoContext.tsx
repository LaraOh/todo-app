import React, { createContext } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";

interface TodoContextProps {
  todo: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  updateTodoStatus: (id: string) => void;
}

export interface Todo {
  id: string;
  text: string;
  status: "undone" | "completed";
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

// initializes todo state by using State hook, todo items are saved in array
export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todo, setTodo] = useLocalStorage<Todo[]>("todo", []);

  // add new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      status: "undone",
    };

    setTodo([...todo, newTodo]);
  };

  // delete todo item
  const deleteTodo = (id: string) => {
    // filter out todo item with matching id
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  // edit todo item
  const editTodo = (id: string, text: string) => {
    // map over todo items and update text of item with matching id
    setTodo((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id == id) {
          return { ...todo, text };
        }
        return todo;
      });
    });
  };

  // update todo item status
  const updateTodoStatus = (id: string) => {
    // map over items to change status of item with matching id
    setTodo((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: todo.status === "undone" ? "completed" : "undone",
          };
        }
        return todo;
      });
    });
  };

  // create value for context
  const value: TodoContextProps = {
    todo,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
  };

  // give context to child components
  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};
