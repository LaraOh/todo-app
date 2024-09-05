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
    <motion.li layout key={todo.id}>
      {editingTodoId === todo.id ? (
        <motion.div layout>
          <Input
            ref={editInputRef}
            type="text"
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary text-light border"
            type="button"
            onClick={() => handleUpdate(todo.id)}
          >
            Update
          </button>
        </motion.div>
      ) : (
        <div className="border-top p-4 border-dark-subtle">
          <motion.span
            layout
            style={{
              textDecoration:
                todo.status === "completed" ? "line-through" : "none",
            }}
          >
            {todo.text}
          </motion.span>
          <div className="btn-group float-end">
            <button
              className="btn btn-outline-secondary text-light border "
              type="button"
              onClick={() => handleStatusUpdate(todo.id)}
            >
              {todo.status === "undone" ? (
                <i className="bi bi-check2-circle"></i>
              ) : (
                <i className="bi bi-arrow-clockwise"></i>
              )}
            </button>

            <button
              className="btn btn-outline-secondary text-light border "
              type="button"
              onClick={() => handleEdit(todo.id, todo.text)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-outline-secondary text-light border "
              type="button"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      )}
    </motion.li>
  );
};
