import "./App.scss";
import TodoList from "./components/TodoList";
import TodoListsPanel from "./components/TodoListsSidebar";

function App() {
   return (
      <div className="App">
         <TodoListsPanel />
         <TodoList />
      </div>
   );
}

export default App;
