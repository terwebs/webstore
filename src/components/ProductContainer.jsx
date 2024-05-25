import ProductsList from "./ProductsList";
import ProductsGrid from "./ProductsGrid";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

export default function ProductContainer() {
  const { response, products } = useLoaderData();
  const totalProducts = response.data.total;

  const [layout, setLayout] = useState(() => {
    return localStorage.getItem("layout") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  const setActiveStyle = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? `btn-primary text-primary text-primary-content`
        : `btn-ghost text-based-concent`
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActiveStyle("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActiveStyle("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/* END HEADER */}
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text 2xl mt-16">Sorry, no products found...</h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
      {/* check if there is no product, and then check if layout is grid or list */}
      {/* END PRODUCTS */}
    </>
  );
}
