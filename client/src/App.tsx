import "./App.scss";
import HomePage from "./components/HomePage";
import Overlay from "./components/Overlay";
import TodoList from "./components/TodoList";
import TodoListsSidebar from "./components/TodoListsSidebar";

function App() {
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
