import express from "express";
import cors from "cors";
import pool from "./db";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

// add a todo list
app.post("/todo-lists", async (req, res) => {
   try {
      const date = req.body.date;

      const newTodoList = await pool.query(
         "INSERT INTO todo_list (date) VALUES(TO_DATE($1, 'YYYY/MM/DD')) RETURNING *",
         [date]
      );

      res.json(newTodoList.rows[0]);
   } catch (error) {
      console.log((error as Error).message);
   }
});

// add a todo entry to a todo list
app.post("/todo-lists/:todoListID", async (req, res) => {
   try {
      const todoListID = req.params.todoListID;
      const { isChecked, description, time } = req.body;
      const newTodo = await pool.query(
         "INSERT INTO todo_entry (todo_list_id, is_checked, description, time) VALUES($1, $2, $3, $4) RETURNING *",
         [todoListID, isChecked, description, time]
      );

      res.json(newTodo.rows[0]);
   } catch (error) {
      console.log((error as Error).message);
   }
});

// get todo entry from a todo list
app.get("/todo-lists/:todoListID/todo-entries/:todoEntryID", async (req, res) => {
   try {
      const todoEntryID = req.params.todoListID;
      const todoEntry = await pool.query("SELECT * FROM todo_entry WHERE id = $1", [todoEntryID]);

      res.json(todoEntry.rows)[0];
   } catch (error) {
      console.log((error as Error).message);
   }
});

// get all todo entries from a todo list
app.get("/todo-lists/:todoListID", async (req, res) => {
   try {
      const todoListID = req.params.todoListID;
      const todoEntries = await pool.query("SELECT * FROM todo_entry WHERE todo_list_id = $1", [todoListID]);

      res.json(todoEntries.rows);
   } catch (error) {
      console.log((error as Error).message);
   }
});

// delete a todo entry
app.delete("/todo-lists/:todoListID/todo-entries/:todoEntryID", async (req, res) => {
   try {
      const todoEntryID = req.params.todoEntryID;
      const deleteTodo = await pool.query("DELETE FROM todo_entry WHERE id = $1", [todoEntryID]);

      res.json("Todo " + todoEntryID + " was deleted!");
   } catch (error) {
      console.log(error.message);
   }
});

app.listen(5000, () => {
   console.log("server has started on port 5000");
});

// // create a todo item
// app.post("/todo_entries", async (req, res) => {
//    try {
//       const { isChecked, description, time } = req.body;
//       const newTodo = await pool.query(
//          "INSERT INTO todo (is_checked, description, time) VALUES($1, $2, $3) RETURNING *",
//          [isChecked, description, time]
//       );

//       res.json(newTodo.rows[0]);
//    } catch (error) {
//       console.log(error.message);
//    }
// });

// // get all todo entries
// app.get("/todo_entries", async (req, res) => {
//    try {
//       const allTodos = await pool.query("SELECT * FROM todo");

//       res.json(allTodos.rows);
//    } catch (error) {
//       console.log(error.message);
//    }
// });

// // get a todo entry
// app.get("/todo_entries/:id", async (req, res) => {
//    try {
//       const { id } = req.params;
//       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

//       res.json(todo.rows)[0];
//    } catch (error) {
//       console.log(error.message);
//    }
// });

// // update a todo entry
// app.put("/todo_entries/:id", async (req, res) => {
//    try {
//       const { id } = req.params;
//       const { isChecked, description, time } = req.body;
//       const updateTodo = await pool.query(
//          "UPDATE todo SET is_checked = $1, description = $2, time = $3 WHERE todo_id = $4",
//          [isChecked, description, time, id]
//       );

//       res.json("Todo " + id + " was updated!");
//    } catch (error) {
//       console.log(error.message);
//    }
// });

// // delete a todo entry
// app.delete("/todo_entries/:id", async (req, res) => {
//    try {
//       const { id } = req.params;
//       const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

//       res.json("Todo " + id + " was deleted!");
//    } catch (error) {
//       console.log(error.message);
//    }
// });
