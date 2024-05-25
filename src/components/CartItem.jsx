import { formatPrice, generateOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";

export default function CartItem({ cartItem }) {
  const { cartID, title, image, quantity, company, productSize, price } =
    cartItem;
  const dispatch = useDispatch({ cartID });
  const removeItemFromCart = () => dispatch(removeItem({ cartID }));

  const handleQuantity = (event) => {
    dispatch(editItem({ cartID, quantity: parseInt(event.target.value) }));
  };

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="capitalize text-sm text-neutral-content mt-2">
          {company}
        </h4>
        {productSize ? (
          <p className="mt-2 text-sm capitalize flex items-center gap-x-2">
            Size:
            <span className="">{productSize}</span>
          </p>
        ) : null}
        {/* REMOVE ITEM */}
        <button
          onClick={removeItemFromCart}
          className="mt-4 link link-primary link-hover text-sm font-bold"
        >
          Remove
        </button>
      </div>
      <div className="sm:ml-24">
        {/* QUANTITY */}
        <div className="form-control max-w-xs">
          <label htmlFor="quantity" className="label p-0">
            Quantity
          </label>
          <select
            name="quantity"
            id="quantity"
            className="mt-2 select select-base selcted-bordered select-xs"
            value={quantity}
            onChange={handleQuantity}
          >
            {generateOptions(quantity)}
          </select>
        </div>
      </div>
      <p className="font-medium sm:ml-auto"> {formatPrice(price)}</p>
    </article>
  );
}
