import { Router } from "express";
import { userController } from "../controllers/users.controller";

const router = Router();
const controller = userController();
router.post("/register", controller.registerNewUser);
router.get("/:dni", controller.getUserById);
router.get("/", controller.findAllUsers);
router.put("/:dni", controller.updateUser);
router.delete("/:dni", controller.deleteUser);

export default router;
