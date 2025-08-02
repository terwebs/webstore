import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

const carouselImages = [hero1, hero2];

export default function Hero() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-clicker   sm:text-6xl ">
          <span className="font-stolen">Ember</span>
          <br></br>
          Brilla distinto.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          Cada chispa guarda una historia
        </p>
        <div className="mt-10 ">
          <Link to="products" className="btn btn-primary rounded-lg">
            Nuestros Productos
          </Link>
        </div>
      </div>
      <div className="hidden  h-[28rem] lg:carousel carousel-center   p-4 space-x-4 bg-neutral rounded-box">
        <ImageSlider
          images={carouselImages}
          className="w-96 h-auto object-cover rounded-lg lg:w-full"
        />
      </div>
    </div>
  );
}
