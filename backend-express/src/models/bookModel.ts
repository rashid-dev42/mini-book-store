import { Schema, Model, model } from "mongoose";

interface IBook {
  imgPath: string,
  title: string,
  author: string,
  price: number,
  inStock: number
}

type BookModel = Model<IBook>;

const bookSchema = new Schema<IBook, BookModel>({
  imgPath: String,
  title: String,
  author: String,
  price: Number,
  inStock: Number
});

export const Book = model<IBook, BookModel>("Book", bookSchema);