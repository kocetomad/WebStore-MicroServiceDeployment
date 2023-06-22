import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import cors from 'cors';// Connect to the database using the DATABASE_URL environment

const pool = new pg.Pool();

const app = express();
// app.use(cors);
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(express.static('public'));

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()");
  res.send(`Hello, World! The time from the DB is ${rows[0].now}`);
});

app.get("/test", async (req, res) => {
  res.send(`Hello, World!`);
});

app.post("/backup", async (req, res) => {
  const { id, item_name, item_description, item_tags, item_price, item_featured } = req.body;
  const { rows } = await pool.query(`INSERT INTO items (item_name, item_description, item_tags, item_price, item_featured) values ('${item_name}','${item_description}','${item_tags}','${item_price}','${item_featured}')`);
  res.send(`Hello, World! The time from the DB is ${rows[0]}`);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;