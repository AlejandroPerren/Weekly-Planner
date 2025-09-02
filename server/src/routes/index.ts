import express from "express";

const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API RESTful con TypeScript y Express",
  });
});


router.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Recurso no encontrado",
  });
});

export default router;