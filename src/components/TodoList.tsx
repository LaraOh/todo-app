import { TodoItem } from "./TodoItem";
import { useTodo } from "../context";
import { motion } from "framer-motion";

export const TodoList = () => {
  const { todo } = useTodo();

  // todo list empty
  if (!todo.length) {
    return (
      <div className="max-w-lg px-5 m-auto">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl bg-zinc-900">
          <i className="bi bi-stars"></i>
          Nothing to do
        </h1>
      </div>
    );
  }

  // display todo items
  return (
    <motion.ul className="grid max-w-lg gap-2 px-5 m-auto">
      {todo.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </motion.ul>
  );
};
