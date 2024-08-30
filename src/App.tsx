import { TodoList, AddTodo } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/*Displays toast notification at position on screen */}
      <Toaster position="bottom-center"></Toaster>
      <AddTodo /> {/* Input field and button for new todo items*/}
      <TodoList /> {/* List of existing todo items*/}
    </div>
  );
}

export default App;
