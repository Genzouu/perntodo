import { useSelector } from "react-redux";
import { StateType } from "../redux/reducers";
import "./AddTaskModel.scss";

export interface AddTaskModelProps {
   getTodos?: () => {};
}

export default function AddTaskModel(props: AddTaskModelProps) {
   const selectedTodoList = useSelector((state: StateType) => state.selectedTodoList);

   async function addTask() {
      const description = (document.getElementsByClassName("description-text-area")[0] as HTMLTextAreaElement).value;
      const startHour = (document.getElementsByClassName("start-hour-list")[0] as HTMLSelectElement).value;
      const startMinute = (document.getElementsByClassName("start-minute-list")[0] as HTMLSelectElement).value;
      //const startDayPeriod = (document.getElementsByClassName("start-day-period")[0] as HTMLSelectElement).value;
      const endHour = (document.getElementsByClassName("end-hour-list")[0] as HTMLSelectElement).value;
      const endMinute = (document.getElementsByClassName("end-minute-list")[0] as HTMLSelectElement).value;
      //const endDayPeriod = (document.getElementsByClassName("end-day-period")[0] as HTMLSelectElement).value;

      const newTodo = {
         isChecked: false,
         description: description,
         time: `[${startHour}:${startMinute}:00, ${endHour}:${endMinute}:00]`,
      };

      try {
         const response = await fetch(`http://localhost:5000/todo-lists/${selectedTodoList.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
         });

         // props.getTodos();
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   return (
      <div className="add-task-model">
         <div className="description-container">
            <p className="description">Description</p>
            <textarea className="description-text-area"></textarea>
         </div>
         <div className="time-container">
            <div className="start-time-container">
               <p className="start-time">Start Time</p>
               <select className="start-hour-list">
                  {[...Array(24)].map((hour, index) => (
                     <option className="start-hour-list-item" key={index}>
                        {index.toString().padStart(2, "0")}
                     </option>
                  ))}
               </select>
               <p className="colon">:</p>
               <select className="start-minute-list">
                  {[...Array(60)].map((minute, index) => (
                     <option className="start-minute-list-item" key={index}>
                        {index.toString().padStart(2, "0")}
                     </option>
                  ))}
               </select>
               <select className="start-day-period">
                  <option className="start-am">AM</option>
                  <option className="start-pm">PM</option>
               </select>
            </div>
            <div className="end-time-container">
               <p className="end-time">End Time</p>
               <select className="end-hour-list">
                  {[...Array(24)].map((hour, index) => (
                     <option className="end-hour-list-item" key={index}>
                        {index.toString().padStart(2, "0")}
                     </option>
                  ))}
               </select>
               <p className="colon">:</p>
               <select className="end-minute-list">
                  {[...Array(60)].map((minute, index) => (
                     <option className="end-minute-list-item" key={index}>
                        {index.toString().padStart(2, "0")}
                     </option>
                  ))}
               </select>
               <select className="end-day-period">
                  <option className="end-am">AM</option>
                  <option className="end-pm">PM</option>
               </select>
            </div>
         </div>
         <button className="add-task" onClick={() => addTask()}>
            Add Task
         </button>
      </div>
   );
}
