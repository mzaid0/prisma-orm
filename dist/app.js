import express from "express";
import { config } from "dotenv";
config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// API routes
import userRoute from "./routes/user-routes.js";
// Use API routes
app.use("/api/v1/users", userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
