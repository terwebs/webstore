// ProductContainer.jsx

import ProductsList from "./ProductsList";
import ProductsGrid from "./ProductsGrid";
import { useState, useEffect } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll"; // Import the custom hook
import { useLoaderData } from "react-router-dom";

export default function ProductContainer({
  initialProducts,
  initialParams,
  totalProducts,
}) {
  // Use the custom hook here, passing the initial products and params
  const { products, isLoading, hasMore, ref } = useInfiniteScroll(
    initialProducts,
    initialParams
  );

  const [layout, setLayout] = useState(() => {
    return localStorage.getItem("layout") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  const setActiveStyle = (pattern) => {
    // ... same as before ...
  };

  const { response } = useLoaderData();

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} producto
          {(totalProducts > 1 || totalProducts === 0) && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActiveStyle("grid")}
          >
            <BsFillGridFill />
          </button>
          {/* <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActiveStyle("list")}
          >
            <BsList />
          </button> */}
        </div>
      </div>
      {/* END HEADER */}

      {/* PRODUCTS */}
      <div>
        {products.length === 0 ? (
          <h5 className="text 2xl mt-16">No hay productos...</h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>

      {/* This is the element that the observer will watch */}
      {hasMore && (
        <div ref={ref} className="text-center my-4">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>
      )}

      {/* END PRODUCTS */}
    </>
  );
}
