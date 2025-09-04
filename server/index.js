import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

// Permitir requests desde el frontend
app.use(cors({
  origin: "http://localhost:5173", // URL de tu frontend
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// GET /api/eventos
app.get("/api/eventos", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM eventos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/eventos
app.post("/api/eventos", async (req, res) => {
  const { title, description, nombreEvento, lugar, tipo, is_active } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO eventos (title, description, nombreEvento, lugar, tipo, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, nombreEvento, lugar, tipo, is_active]
    );
    res.json({ id: result.insertId, title, description, nombreEvento, lugar, tipo, is_active });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/evento/:id/toggle
app.patch("/api/evento/:id/toggle", async (req, res) => {
  const { id } = req.params;
  try {
    const [evento] = await db.execute("SELECT is_active FROM eventos WHERE id = ?", [id]);
    if (!evento.length) return res.status(404).json({ error: "Evento no encontrado" });

    const newStatus = !evento[0].is_active;
    await db.execute("UPDATE eventos SET is_active = ? WHERE id = ?", [newStatus, id]);
    res.json({ id, is_active: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
