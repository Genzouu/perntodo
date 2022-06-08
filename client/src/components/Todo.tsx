import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./Todo.scss";
import { StateType } from "../redux/reducers";
import { setTodoEntries } from "../redux/slices/currentTodoEntriesSlice";

export interface TodoType {
   id: number;
   isChecked: boolean;
   description: string;
   time: string;
}

export default function Todo(props: TodoType) {
   const dispatch = useDispatch();
   const currentTodoEntries = useSelector((state: StateType) => state.currentTodoEntries);

   async function deleteTodo() {
      try {
         const response = await fetch(`http://localhost:5000/todo-lists/1/todo-entries/${props.id}`, {
            method: "DELETE",
         });

         dispatch(setTodoEntries(currentTodoEntries.filter((x) => x.id !== props.id)));
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   function getTimeString(postgresTimeString: string) {
      let sections = postgresTimeString.split("-"); // split into sections

      console.log(sections[0] + " - " + sections[1]);
      return sections[0] + " - " + sections[1];
   }

   return (
      <div className="todo">
         <div className="checkbox"></div>
         <div className="body-grid-container">
            <p className="description">{props.description}</p>
            <div className="time-edit-delete-container">
               <p className="time">{getTimeString(props.time)}</p>
               <div className="edit-delete-container">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => deleteTodo()}>
                     Delete
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
