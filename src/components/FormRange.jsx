import { formatPrice } from "../utils";
import { useState } from "react";

export default function FormRange({
  label,
  name,
  size,
  price,
  value,
  onChange,
}) {
  const step = 500;
  const maxPrice = 10000;
  // const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(price)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={value}
        onChange={onChange}
        step={step}
        className={`range range-primary ${size}`}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2 ">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}
