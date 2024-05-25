import { useLoaderData } from "react-router-dom";
import { formatPrice, generateOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createClient } from "contentful";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const client = createClient({
  space: "6n3ggdxvlwai",
  environment: "master",
  accessToken: import.meta.env.VITE_API_KEY,
});

export const loader = async ({ params }) => {
  // const response = await customFetch(`/entries/${params.id}`);
  const response = await client.getEntry(params.id);

  return { product: response };
};

export default function SingleProductPage() {
  const product = useLoaderData();
  const { title, price, company, category, description } =
    product.product.fields;

  const sizes = product.product.fields.size?.size ?? [];

  const image = product.product.fields.image.fields.file.url;
  const productID = product.product.sys.id;

  const convertedPrice = formatPrice(price);
  const [productSize, setProductSize] = useState(sizes[0] || []);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const fillOptions = () => {
    const selectOptions = [];
    for (let i = 0; i < 100; i++) {
      selectOptions.push(i);
    }
    return selectOptions;
  };

  useEffect(() => {
    fillOptions();
  }, []);

  // Dispatching ations from redux toolkit
  const cartProduct = {
    cartID: productID + productSize,
    productID: productID,
    image,
    title,
    price,
    company,
    quantity,
    productSize,
  };

  const dispatch = useDispatch();
  const addtoCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      {/* Breadcrumbs */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/*  PRODUCT */}
      <div className="mt-6 grid ggap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-auto object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold text-primary ">
            {title}
          </h1>
          <h4 className="text-xl text-neutral font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl font-bold">{convertedPrice}</p>
          <p className="mt-6 text-cl capitalize">{category}</p>
          <p className="mt-6 text-cl">{description ? description : ""}</p>

          {/* Size */}
          {sizes.length > 0 ? (
            <div className="mt-6">
              <h4 className="mt-6 font-medium tracking-wider capitalize">
                size
              </h4>
              <div className="mt-2 flex justify-start gap-6 ">
                {sizes.map((i) => {
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`badge w-24 h-6 capitalize btn border-2 border-primary ${
                        i === productSize && "font-bold btn-primary"
                      }`}
                      onClick={() => setProductSize(i)}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          {/* QUANTITY */}
          <div className="form-control w-full max-w-xs mt-8">
            <label className="label p-0" htmlFor="quantity">
              <h4 className="text-md font-medium tracking-wider">Quantity</h4>
            </label>
            <select
              name="quantity"
              id="quantity"
              className="select select-secondary select-bordered select-md my-2"
              onChange={handleQuantity}
              value={quantity}
            >
              {generateOptions()}
            </select>
          </div>
          {/* CART BTN */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addtoCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
