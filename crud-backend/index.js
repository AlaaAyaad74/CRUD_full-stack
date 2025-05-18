import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes.js";
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api", clientRoutes);
app.listen(port, () => {
  console.log(`you are listening to port ${port}`);
});
