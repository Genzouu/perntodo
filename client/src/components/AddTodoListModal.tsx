import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StateType } from "../redux/reducers";
import { setTodoLists } from "../redux/slices/currentTodoListSlice";
import { toggleAddTodoListModal } from "../redux/slices/modalStateSlice";
import { setSelectedTodoList } from "../redux/slices/selectedTodoListSlice";
import "./AddTodoListModal.scss";
import { TodoListType } from "./TodoList";

export default function AddTodoListModal() {
   const dispatch = useDispatch();
   const currentTodoLists = useSelector((state: StateType) => state.currentTodoLists);

   async function addTodoList() {
      try {
         const title = (document.getElementsByClassName("title-input")[0] as HTMLInputElement).value;
         const newDate = new Date();
         const todoList = {
            title: title,
            date: `${newDate.getFullYear()}/${String(newDate.getMonth() + 1).padStart(2, "0")}/${String(
               newDate.getDate()
            ).padStart(2, "0")}`,
         };

         const response = await fetch("http://localhost:5000/todo-lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todoList),
         });
         const addTodoList: TodoListType = await response.json();

         // to get JSON.stringify to work with a non-object, wrap the variable in curly brackets. e.g. const date = new Date, JSON.stringify({ date })

         dispatch(setTodoLists([...currentTodoLists, { id: addTodoList.id, ...todoList }]));
         dispatch(setSelectedTodoList(currentTodoLists[currentTodoLists.length - 1]));

         dispatch(toggleAddTodoListModal());
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   return (
      <div className="add-todo-list-modal">
         <div className="title-container">
            <p className="title-text">Title</p>
            <input type="text" className="title-input" />
         </div>
         <div className="date-container">
            <p className="date-text">Date</p>
            <Calendar />
         </div>
         <button className="add-todo-list" onClick={() => addTodoList()}>
            Add Todo List
         </button>
      </div>
   );
}
