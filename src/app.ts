import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "./routes/card";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", cardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
