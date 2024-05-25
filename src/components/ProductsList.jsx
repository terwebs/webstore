import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

export default function ProductsList() {
  const { products } = useLoaderData();
  return (
    <div className="mt-12 grid gap-y-8 ">
      {products.map((product) => {
        const { title, price, company } = product.fields;
        const imageUrl = product.imageUrl;
        const convertedPrice = formatPrice(price);
        return (
          <Link
            to={`/products/${product.sys.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
            key={product.sys.id}
          >
            <img
              src={imageUrl}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg text-primary">
                {title}
              </h3>
              <h4 className="capitalize font-medium text-md text-neutral-content">
                {company}
              </h4>
            </div>
            <p className="text-secondary font-medium ml-0 sm:ml-auto text-xl">
              {convertedPrice}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
