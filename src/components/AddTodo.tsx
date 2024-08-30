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
      <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
        {/* Input space */}
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          //className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
          placeholder="start typing ..."
        />
        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
