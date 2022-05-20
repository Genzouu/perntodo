import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StateType } from "../redux/reducers";
import { setSelectedTodoList } from "../redux/slices/selectedTodoListSlice";

import "./TodoListsSidebar.scss";

export default function TodoListsSidebar() {
   const dispatch = useDispatch();

   const [todoLists, setTodoLists] = useState<{ id: number; date: string }[]>([]);

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
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   async function getTodoLists() {
      try {
         const response = await fetch("http://localhost:5000/todo-lists");
         const jsonData: { id: number; date: string }[] = await response.json();

         const newTodoLists = jsonData.map((x) => {
            return { id: x.id, date: x.date };
         });

         setTodoLists(jsonData);
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   function getDateString(postgresDate: string): string[] {
      const dateSections = postgresDate.slice(0, 10).split("-"); // get each section
      let newDateString = dateSections[2] + "/" + dateSections[1];
      return [newDateString, dateSections[0]]; // return ["DD-MM", "YYYY"];
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
                  onClick={() => dispatch(setSelectedTodoList(todoList.id))}
                  key={index}
               >
                  <p className="month-day">{getDateString(todoList.date)[0]}</p>
                  <p className="year">{getDateString(todoList.date)[1]}</p>
               </button>
            ))}
         </div>
         <div className="add-todo-list sidebar-icon" onClick={() => addTodoList()}>
            <AiOutlinePlus />
         </div>
      </div>
   );
}
