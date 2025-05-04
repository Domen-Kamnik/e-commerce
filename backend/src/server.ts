import express, { Express } from "express";
import authRoutes from "./routes/auth";
import cors from "cors";

const app: Express = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log(3000);
});
