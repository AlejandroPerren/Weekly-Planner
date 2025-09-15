import express from "express";
import authRoutes from "./auth.route";
import userRouter from "./user.route";
const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.json({  
    ok: true,
    message: "API RESTful con TypeScript y Express",
  });
});

router.use("/auth", authRoutes);
router.use("/user", userRouter);

router.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Recurso no encontrado",
  });
});

export default router;
