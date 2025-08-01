import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  return (
    <div className="carousel w-full">
      {images.map((url, i) => (
        <div
          key={i}
          id={`slide${i + 1}`}
          className="carousel-item relative w-full"
        >
          <img src={url} className="w-full" alt={`Slide ${i + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${((i - 1 + images.length) % images.length) + 1}`}
              className="btn btn-circle bg-opacity-30 hover:bg-opacity-40 border-none"
            >
              ❮
            </a>
            <a
              href={`#slide${((i + 1) % images.length) + 1}`}
              className="btn btn-circle bg-opacity-30 hover:bg-opacity-40 border-none"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
