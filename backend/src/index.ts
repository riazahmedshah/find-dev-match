import express from "express"

const app = express();
const PORT = 1100;
app.listen(PORT,() => {
  console.log(`Serever is running on http://localhost:${PORT}`);
})