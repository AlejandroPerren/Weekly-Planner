import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./src/routes";
import express, { NextFunction, Request, Response } from "express";
import { NODE_ENV, PORT } from "./env";
import sequelizeConnection from "./src/database/connection";
import { User } from "./src/database/models/User";
import { Task } from "./src/database/models/Task";

dotenv.config({
  path: path.resolve(__dirname, "./environments/.env"),
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use("/api", router);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    ok: false,
    message: "Error interno del servidor",
  });
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("✅ Base de datos conectada");

    User.associate?.();
    Task.associate?.();

    return sequelizeConnection.sync({ force: true });
  })
  .then(() => {
    console.log("✅ Tablas recreadas desde cero");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar/sincronizar:", error);
  });
