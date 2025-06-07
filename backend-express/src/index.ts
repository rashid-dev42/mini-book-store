import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
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
  } catch (error) {
    res.status(500).send({
      message: "Sorry, something went wrong"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});