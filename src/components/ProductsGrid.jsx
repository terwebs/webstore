import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
export default function ProductsGrid() {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, price } = product.fields;
        const imageUrl = product.imageUrl;
        const convertedPrice = formatPrice(price);
        return (
          <Link
            key={product.sys.id}
            to={`/products/${product.sys.id}`}
            className="card w-full  shadow-xl hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={imageUrl}
                alt={title}
                className="rounded-xl h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{convertedPrice}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
