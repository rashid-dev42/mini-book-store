import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import fs from "fs";
import { Book } from "./models/bookModel";
const app = express();
const port = 5000;

// const upload = multer({ dest: './uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("WELCOME TO BOOK-SHOP-WEBAPP-THREE");
});

app.post("/upload-book-image", upload.single("bookImage"), (req: Request, res: Response) => {
  try {
    res.status(200).send({
      imgPath: req?.file?.path || "",
    });
  } catch (error: any) {
    res.status(error.status || 500).send({
      message: error.message || "Sorry, something went wrong"
    });
  }
});

app.put("/update-book-image", upload.single("newBookImage"), async (req: Request, res: Response) => {
  try {
    const bookId = req.body.bookId;
    await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
    const result = await Book.findOne({ _id: bookId }, { imgPath: 1, _id: 0 });
    const prevImagePath: string = result?.imgPath || "";
    if (prevImagePath !== "") {
      fs.unlink(prevImagePath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${prevImagePath} was deleted successfully`);
        }
      })
    }
    const newImagePath = req?.file?.path || "";
    await Book.updateOne({ _id: bookId }, { $set: { imgPath: newImagePath } })
    await mongoose.connection.close();
    res.status(200).send({
      imgPath: newImagePath || ""
    });
  } catch (error: any) {
    res.status(error.status || 500).send({
      message: error.message || "Sorry, something went wrong"
    });
  }
});

app.delete("/delete-book-image/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
    const result = await Book.findOne({ _id: bookId }, { imgPath: 1, _id: 0 });
    const bookImagePath: string = result?.imgPath || "";
    if (bookImagePath !== "") {
      fs.unlink(bookImagePath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${bookImagePath} was deleted successfully`);
        }
      });
    }
    await mongoose.connection.close();
    res.status(204).send();
  } catch (error: any) {
    res.status(error.status || 500).send({
      message: error.message || "Sorry, something went wrong"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});