//Require express and body-parser
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

//Initialize express and define a port
const app = express();
const PORT = process.env.MAIN_PORT;

//Tell express to user body-parser's JSON parsing
app.use(cors(
  {origin: `http://localhost:5173`, 
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })); // Allow CORS from the web app

app.use(bodyParser.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

//Start express on the defined port
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
export default app;
