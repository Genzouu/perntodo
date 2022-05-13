import { useEffect, useState } from "react";

import "./TodoList.scss";
import Todo, { TodoType } from "./Todo";

export default function TodoList() {
   const [todoList, setTodoList] = useState<TodoType[]>([]);

   async function addTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      try {
         const date = new Date();
         const timeString: string = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

         const addedTodo = { isChecked: false, description: "test", time: timeString };

         const response = await fetch("http://localhost:5000/todo-lists/1", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addedTodo),
         });
         
         getTodos();
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   async function getTodos() {
      try {
         const response = await fetch("http://localhost:5000/todos");
         const jsonData: { todo_id: number; is_checked: boolean; description: string; time: string }[] =
            await response.json();

         const newTodoList: TodoType[] = jsonData.map((x) => {
            return { id: x.todo_id, isChecked: x.is_checked, description: x.description, time: x.time };
         });
         setTodoList(newTodoList);
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   async function deleteTodo(id: number) {
      try {
         const response = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE",
         });

         setTodoList(todoList.filter((x) => x.id !== id));
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   useEffect(() => {
      getTodos();
   }, []);

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
         <button className="add-task" onClick={(e) => addTodo(e)}>
            + Add Task
         </button>
         <div className="todos-container">
            {todoList.map((todo, index) => (
               <Todo
                  id={todo.id}
                  isChecked={todo.isChecked}
                  description={todo.description}
                  time={todo.time}
                  onDelete={() => deleteTodo(todo.id)}
                  key={index}
               />
            ))}
         </div>
      </div>
   );
}
