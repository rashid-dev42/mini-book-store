import "./SingleItem.css";
import imageNotFound from "../../../assets/image-not-found.png";
import React from "react";

interface Book {
  _id: string,
  imgPath: string,
  title: string,
  author: string,
  price: number,
  inStock: number
}

interface Props {
  book: Book
}

const SingleItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="SingleItem">
      {props.book.imgPath === "" && <img src={imageNotFound} alt="" className="SingleItem-image"/>}
      <h3>Title: {props.book.title}</h3>
      <h3>Author: {props.book.author}</h3>
      <h3>Price: {props.book.price}</h3>
      <h3>In-stock: {props.book.inStock}</h3>
    </div>
  );
};

export default SingleItem;