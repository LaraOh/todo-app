import { TodoItem } from "./TodoItem";
import { useTodo } from "../context";
import { motion } from "framer-motion";

export const TodoList = () => {
  const { todo } = useTodo();

  // todo list empty
  if (!todo.length) {
    return (
      <div>
        <h1>
          <i className="bi bi-stars"></i>
          Nothing to do
        </h1>
      </div>
    );
  }

  // display todo items
  return (
    <motion.ul>
      {todo.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </motion.ul>
  );
};
