import "./TodoListsSidebar.scss";

export default function TodoListsSidebar() {
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
      } catch (error) {
         console.log((error as Error).message);
      }
   }

   return (
      <div className="todo-lists-sidebar">
         <div className="add-todo-list" onClick={() => addTodoList()}>
            +
         </div>
      </div>
   );
}
