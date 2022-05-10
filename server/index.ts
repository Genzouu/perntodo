import express from "express";
import cors from "cors";
import pool from "./db";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

// create a todo item
app.post("/todos", async (req, res) => {
   try {
      const { isChecked, description, time } = req.body;
      const newTodo = await pool.query(
         "INSERT INTO todo (is_checked, description, time) VALUES($1, $2, $3) RETURNING *",
         [isChecked, description, time]
      );

      res.json(newTodo.rows[0]);
   } catch (error) {
      console.log(error.message);
   }
});

// get all todo entries
app.get("/todos", async (req, res) => {
   try {
      const allTodos = await pool.query("SELECT * FROM todo");

      res.json(allTodos.rows);
   } catch (error) {
      console.log(error.message);
   }
});

// get a todo entry
app.get("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

      res.json(todo.rows)[0];
   } catch (error) {
      console.log(error.message);
   }
});

// update a todo entry
app.put("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { isChecked, description, time } = req.body;
      const updateTodo = await pool.query(
         "UPDATE todo SET is_checked = $1, description = $2, time = $3 WHERE todo_id = $4",
         [isChecked, description, time, id]
      );

      res.json("Todo " + id + " was updated!");
   } catch (error) {
      console.log(error.message);
   }
});

// delete a todo entry
app.delete("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

      res.json("Todo " + id + " was deleted!");
   } catch (error) {
      console.log(error.message);
   }
});

app.listen(5000, () => {
   console.log("server has started on port 5000");
});
