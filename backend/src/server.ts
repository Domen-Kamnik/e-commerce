import express, { Express } from "express";
import authRoutes from "./routes/auth";

const app: Express = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log(3000);
});
