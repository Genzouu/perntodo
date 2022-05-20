import "./Todo.scss";

export interface TodoType {
   id: number;
   isChecked: boolean;
   description: string;
   time: string;
}

export interface TodoProps extends TodoType {
   onDelete: () => {};
}

export default function Todo(props: TodoProps) {
   function getTimeString(postgresTimeString: string) {
      let sections = postgresTimeString.replace(/[\[\]]/g, "").split(","); // replace square brackets then split into sections
      sections = sections.map((x) => x.slice(0, 5)); // get only the HH:MM sections
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
                  <button className="delete" onClick={props.onDelete}>
                     Delete
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
