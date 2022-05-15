import "./App.scss";
import HomePage from "./components/HomePage";
import TodoList from "./components/TodoList";
import TodoListsPanel from "./components/TodoListsSidebar";

// install redux to get the currently selected list

function App() {
   return (
      <div className="App">
         <TodoListsPanel />
         {/* <HomePage /> */}
         <TodoList />
      </div>
   );
}

export default App;
