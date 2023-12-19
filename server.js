const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const db = require("./db");

app.get("/todos", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM todos ORDER BY id");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO todos (task) VALUES ($1) RETURNING *",
      [task]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;

  try {
    const { rows } = await db.query(
      "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *",
      [task, completed, id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(200).send(`Todo with ID ${id} deleted`);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
