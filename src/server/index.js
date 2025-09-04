import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

// Permitir requests desde cualquier origen (o especificar solo el frontend)
app.use(cors({
  origin: "http://localhost:5173"  // <- URL de tu frontend
}));

app.use(express.json());

// Endpoints
app.get("/api/eventos", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM eventos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/eventos", async (req, res) => {
  const { title, description, instructor, duration, price, category, is_active } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO courses (title, description, nombreEvento, lugar, tipo, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, nombreEvento, lugar, tipo, is_active]
    );
    res.json({ id: result.insertId, title, description, nombreEvento, lugar, tipo, is_active });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/evento/:id/toggle", async (req, res) => {
  const { id } = req.params;
  try {
    const [evento] = await db.execute("SELECT is_active FROM evento WHERE id = ?", [id]);
    if (!evento.length) return res.status(404).json({ error: "Evento no encontrado" });
    const newStatus = !evento[0].is_active;
    await db.execute("UPDATE evento SET is_active = ? WHERE id = ?", [newStatus, id]);
    res.json({ id, is_active: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
