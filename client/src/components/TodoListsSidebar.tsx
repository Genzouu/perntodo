import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDateString } from "../helper/dateStringHelper";
import { StateType } from "../redux/reducers";
import { setTodoLists } from "../redux/slices/currentTodoListSlice";
import { toggleAddTodoListModal } from "../redux/slices/modalStateSlice";
import { setSelectedTodoList } from "../redux/slices/selectedTodoListSlice";

import "./TodoListsSidebar.scss";

export default function TodoListsSidebar() {
   const dispatch = useDispatch();
   const state = useSelector((state: StateType) => state);

   // useEffect(() => {
   //    getTodoLists();
   // }, []);

   // async function getTodoLists() {
   //    try {
   //       const response = await fetch("http://localhost:5000/todo-lists");
   //       const jsonData: TodoListType[] = await response.json();

   //       const newTodoLists = jsonData.map((x) => {
   //          return { id: x.id, title: x.title, date: x.date };
   //       });

   //       setTodoLists(newTodoLists);
   //    } catch (error) {
   //       console.log((error as Error).message);
   //    }
   // }

   async function deleteTodoList(index: number) {
      try {
         const response = await fetch(`http://localhost:5000/todo-lists/${state.currentTodoLists[index].id}`, {
            method: "DELETE",
         });

         // set selected todo list to undefined if the user deleted the list they are currently viewing
         if (state.currentTodoLists[index].id === state.selectedTodoList.id) {
            dispatch(setSelectedTodoList({ id: -1, title: "", date: "" }));
         }

         dispatch(setTodoLists(state.currentTodoLists.filter((x) => x.id !== state.currentTodoLists[index].id)));
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   // adding a delete button for now while I work on context menus
   return (
      <div className="todo-lists-sidebar">
         <div className="all-todo-entries sidebar-icon">
            <AiOutlineMenu />
         </div>
         <div className="todo-lists-container">
            {state.currentTodoLists.map((todoList, index) => (
               <div className="todo-list-container" key={index}>
                  <button
                     className="todo-list-icon sidebar-icon"
                     onClick={() => dispatch(setSelectedTodoList(todoList))}
                  >
                     <p className="month-day">
                        {getDateString(todoList.date)[0] + "/" + getDateString(todoList.date)[1]}
                     </p>
                     <p className="year">{getDateString(todoList.date)[2]}</p>
                  </button>
                  <button className="delete-todo-list" onClick={() => deleteTodoList(index)}>
                     X
                  </button>
               </div>
            ))}
         </div>
         <div className="add-todo-list sidebar-icon" onClick={() => dispatch(toggleAddTodoListModal())}>
            <AiOutlinePlus />
         </div>
      </div>
   );
}
