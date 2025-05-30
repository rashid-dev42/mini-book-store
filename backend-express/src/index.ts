import express, { Request, Response } from "express";
const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("WELCOME TO BOOK-SHOP-WEBAPP-THREE");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});