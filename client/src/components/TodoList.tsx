import Todo from "./Todo";
import "./TodoList.scss";

export default function TodoList() {
   return (
      <div className="todo-list">
         <h1 className="title">Title</h1>
         <h2 className="date">{new Date().toDateString()}</h2>
         <div className="line-break-thick"></div>
         <div className="sub-titles">
            <p className="description">Description</p>
            <p className="time">Time</p>
         </div>
         <div className="line-break-thick"></div>
         <button className="add-task">+ Add Task</button>
         <div className="todos-container">
            <Todo isChecked={false} description="Wash car" time="--" />
            <Todo isChecked={true} description="Cook dinner" time="7pm+" />
         </div>
      </div>
   );
}
