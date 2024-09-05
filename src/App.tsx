import { TodoList, AddTodo } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" d-inline-flex p-2 card bg-dark object-fit-contain border border-dark rounded w-50 position-fixed top-50 start-50 translate-middle text-light">
      <div className="card-body ">
        {/*Displays toast notification at position on screen */}
        <Toaster position="bottom-center"></Toaster>
        <AddTodo /> {/* Input field and button for new todo items*/}
        <TodoList /> {/* List of existing todo items*/}
      </div>
    </div>
  );
}

export default App;
