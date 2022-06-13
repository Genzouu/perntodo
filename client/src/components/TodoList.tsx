import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./TodoList.scss";
import Todo, { TodoType } from "./Todo";
import { StateType } from "../redux/reducers";
import { getFormattedDateString } from "../helper/dateStringHelper";
import { setTodoEntries } from "../redux/slices/currentTodoEntriesSlice";
import { toggleAddTodoEntryModal } from "../redux/slices/modalStateSlice";

export interface TodoListType {
   id: number;
   title: string;
   date: string;
}

export default function TodoList() {
   const dispatch = useDispatch();
   const selectedTodoList = useSelector((state: StateType) => state.selectedTodoList);
   const currentTodoEntries = useSelector((state: StateType) => state.currentTodoEntries);

   useEffect(() => {
      getTodos();
   }, [selectedTodoList]);

   async function getTodos() {
      try {
         const response = await fetch(`http://localhost:5000/todo-lists/${selectedTodoList.id}`);
         const jsonData: {
            id: number;
            todo_list_id: number;
            is_checked: boolean;
            description: string;
            time: string;
         }[] = await response.json();

         const newTodoList: TodoType[] = jsonData.map((x) => {
            return { id: x.id, isChecked: x.is_checked, description: x.description, time: x.time };
         });

         dispatch(setTodoEntries(newTodoList));
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   return (
      <div className="todo-list">
         <h1 className="title">Title</h1>
         <h2 className="date">{getFormattedDateString(selectedTodoList.date)}</h2>
         <div className="line-break-thick"></div>
         <div className="sub-titles">
            <p className="description">Description</p>
            <p className="time">Time</p>
         </div>
         <div className="line-break-thick"></div>
         <button className="add-task" onClick={() => dispatch(toggleAddTodoEntryModal())}>
            + Add Task
         </button>
         <div className="todos-container">
            {currentTodoEntries.map((todo, index) => (
               <Todo
                  id={todo.id}
                  isChecked={todo.isChecked}
                  description={todo.description}
                  time={todo.time}
                  key={index}
               />
            ))}
         </div>
      </div>
   );
}
