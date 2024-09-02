import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTodo } from "../context";
import { Input } from "./Input";

export const AddTodo = () => {
  /* update the state with the value of the input as it changes */
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo(); // useTodo hook

  /* automatically focus on an input field */
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  /* handle the form submission: check input is not empty string*/
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      addTodo(input); // add input to todo array
      setInput(""); // reset input value to clear input field
      toast.success("Todo added successfully!");
    } else {
      toast.error("Todo field cannot be empty!");
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <div>
        {/* Input space */}
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="start typing ..."
        />
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
