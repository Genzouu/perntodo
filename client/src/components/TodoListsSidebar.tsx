import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getDateString } from "../helper/dateStringHelper";
import { setSelectedTodoList } from "../redux/slices/selectedTodoListSlice";

import "./TodoListsSidebar.scss";

export interface TodoListType {
   id: number;
   date: string;
}

export default function TodoListsSidebar() {
   const dispatch = useDispatch();

   const [todoLists, setTodoLists] = useState<TodoListType[]>([]);

   useEffect(() => {
      getTodoLists();
   }, []);

   async function addTodoList() {
      try {
         const newDate = new Date();
         const date = `${newDate.getFullYear()}/${String(newDate.getMonth() + 1).padStart(2, "0")}/${String(
            newDate.getDate()
         ).padStart(2, "0")}`;

         const response = await fetch("http://localhost:5000/todo-lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date }),
         });

         getTodoLists();

         dispatch(setSelectedTodoList(todoLists[todoLists.length - 1]));
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   async function getTodoLists() {
      try {
         const response = await fetch("http://localhost:5000/todo-lists");
         const jsonData: TodoListType[] = await response.json();

         const newTodoLists = jsonData.map((x) => {
            return { id: x.id, date: x.date };
         });

         setTodoLists(newTodoLists);
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   return (
      <div className="todo-lists-sidebar">
         <div className="all-todo-entries sidebar-icon" onClick={() => getTodoLists()}>
            <AiOutlineMenu />
         </div>
         <div className="todo-lists-container">
            {todoLists.map((todoList, index) => (
               <button
                  className="todo-list-icon sidebar-icon"
                  onClick={() => dispatch(setSelectedTodoList(todoList))}
                  key={index}
               >
                  <p className="month-day">{getDateString(todoList.date)[0] + "/" + getDateString(todoList.date)[1]}</p>
                  <p className="year">{getDateString(todoList.date)[2]}</p>
               </button>
            ))}
         </div>
         <div className="add-todo-list sidebar-icon" onClick={() => addTodoList()}>
            <AiOutlinePlus />
         </div>
      </div>
   );
}
