import { Router } from "express";
import {
  allUsers,
  deleteUser,
  newUser,
  singleUser,
  updateUser,
} from "../controllers/user-controller.js";

const app = Router();

app.post("/new", newUser);
app.get("/all", allUsers);
app.route("/:id").get(singleUser).put(updateUser).delete(deleteUser);

export default app;
