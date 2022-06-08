import express from "express";
import cors from "cors";
import db from "./db";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

// add a todo list
app.post("/todo-lists", async (req, res) => {
   try {
      const date = req.body.date;

      // store date as string in postgres instead
      const newTodoList = await db.query("INSERT INTO todo_list (date) VALUES(TO_DATE($1, 'YYYY/MM/DD')) RETURNING *", [
         date,
      ]);

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
      const newTodo = await db.query(
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
      const todoEntry = await db.query("SELECT * FROM todo_entry WHERE id = $1", [todoEntryID]);

      res.json(todoEntry.rows)[0];
   } catch (error) {
      console.log((error as Error).message);
   }
});

// get all todo entries from a todo list
app.get("/todo-lists/:todoListID", async (req, res) => {
   try {
      const todoListID = req.params.todoListID;
      const todoEntries = await db.query("SELECT * FROM todo_entry WHERE todo_list_id = $1", [todoListID]);

      res.json(todoEntries.rows);
   } catch (error) {
      console.log((error as Error).message);
   }
});

// get all todo lists
app.get("/todo-lists", async (req, res) => {
   try {
      const todoLists = await db.query("SELECT * FROM todo_list");
      res.json(todoLists.rows);
   } catch (error) {
      console.log((error as Error).message);
   }
});

// delete a todo entry
app.delete("/todo-lists/:todoListID/todo-entries/:todoEntryID", async (req, res) => {
   try {
      const todoEntryID = req.params.todoEntryID;
      const deleteTodo = await db.query("DELETE FROM todo_entry WHERE id = $1", [todoEntryID]);

      res.json("Todo " + todoEntryID + " was deleted!");
   } catch (error) {
      console.log((error as Error).message);
   }
});

app.delete("/todo-lists/:todoListID", async (req, res) => {
   try {
      const todoListID = req.params.todoListID;
      const deleteTodoList = await db.query(
         "WITH DELETE_ENTRIES AS (DELETE FROM todo_entry WHERE todo_list_id = $1) DELETE FROM todo_list WHERE id = $1",
         [todoListID]
      );

      res.json("Todo list " + todoListID + " was deleted!");
   } catch (error) {
      console.log((error as Error).message);
   }
});

app.listen(5000, () => {
   console.log("server has started on port 5000");
});
