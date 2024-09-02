import type { Todo } from "../context";
import { useEffect, useRef, useState } from "react";
import { useTodo } from "../context";
import { Input } from "./Input";
import { toast } from "react-hot-toast";
//import cn from "classnames";
import { motion } from "framer-motion";

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props;

  const [editingTodoText, setEditingTodoText] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const { deleteTodo, editTodo, updateTodoStatus } = useTodo();

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodoId]);

  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId);
    setEditingTodoText(todoText);

    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  };

  const handleUpdate = (todoId: string) => {
    if (editingTodoText.trim() !== "") {
      editTodo(todoId, editingTodoText);
      setEditingTodoId(null);
      setEditingTodoText("");
      toast.success("Update successfully!");
    } else {
      toast.error("Todo field cannot be empty!");
    }
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
    toast.success("Todo deleted");
  };

  const handleStatusUpdate = (todoId: string) => {
    updateTodoStatus(todoId);
    toast.success("Status has been updated");
  };

  return (
    <motion.li
      layout
      key={todo.id}
      //   className={cn(
      //     "p-5 rounded-xl bg-zinc-900",
      //     todo.status === "completed" && "bg-opacity-50 text-zinc-500"
      //   )}
    >
      {editingTodoId === todo.id ? (
        <motion.div layout>
          <Input
            ref={editInputRef}
            type="text"
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
          />
          <button
            //className="px-5 py-2 text-sm font-normal text-orange-300 bg-orange-900 border-2 border-orange-900 active:scale-95 rounded-xl"
            onClick={() => handleUpdate(todo.id)}
          >
            Update
          </button>
        </motion.div>
      ) : (
        <div>
          <motion.span
            layout
            style={{
              textDecoration:
                todo.status === "completed" ? "line-through" : "none",
            }}
          >
            {todo.text}
          </motion.span>
          <div>
            <button onClick={() => handleStatusUpdate(todo.id)}>
              {todo.status === "undone" ? (
                <span>
                  <i className="bi bi-check2-circle"></i>
                  Mark Completed
                </span>
              ) : (
                <span>
                  <i className="bi bi-arrow-clockwise"></i>
                  Mark Undone
                </span>
              )}
            </button>
            <div>
              <button onClick={() => handleEdit(todo.id, todo.text)}>
                <i className="bi bi-pencil-square"></i>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                <i className="bi bi-trash"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.li>
  );
};
