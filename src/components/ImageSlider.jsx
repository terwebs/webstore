import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="carousel w-full">
      {images.map((url, i) => (
        <div
          key={i}
          className={`carousel-item relative w-full ${
            i === current ? "" : "hidden"
          }`}
        >
          <img
            src={url}
            className="w-full object-cover"
            alt={`Slide ${i + 1}`}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button
              onClick={() =>
                setCurrent((current - 1 + images.length) % images.length)
              }
              className="btn btn-circle bg-opacity-30 hover:bg-opacity-40 border-none"
            >
              ❮
            </button>
            <button
              onClick={() => setCurrent((current + 1) % images.length)}
              className="btn btn-circle bg-opacity-30 hover:bg-opacity-40 border-none"
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
