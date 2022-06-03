import { useSelector } from "react-redux";
import "./App.scss";
import HomePage from "./components/HomePage";
import Overlay from "./components/Overlay";
import TodoList from "./components/TodoList";
import TodoListsSidebar from "./components/TodoListsSidebar";
import { StateType } from "./redux/reducers";

function App() {
   const modalStates = useSelector((state: StateType) => state.modalState);

   return (
      <div className="App">
         <Overlay />
         <TodoListsSidebar />
         {/* <HomePage /> */}
         <TodoList />
      </div>
   );
}

export default App;
