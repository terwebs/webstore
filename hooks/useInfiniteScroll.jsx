// hooks/useInfiniteScroll.jsx

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { customFetch } from "../src/utils"; // Import your fetch utility

export function useInfiniteScroll(initialProducts, initialParams) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 'ref' will be attached to the element we want to observe
  // 'inView' will be true when the element is in the viewport
  const { ref, inView } = useInView({
    // Trigger the fetch as soon as the element is visible
    rootMargin: "200px",
  });

  // A ref to hold the current query parameters
  const paramsRef = useRef(initialParams);

  // Function to fetch more products
  const fetchMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await customFetch("/entries", {
        params: {
          ...paramsRef.current,
          content_type: "product",
          skip: nextPage * 9, // Assuming limit is 9, skip calculation is (page * limit)
        },
      });

      const items = response.data.items;
      const assets = response.data.includes.Asset;

      // Map entries to include image URLs
      const newProducts = items.map((item) => {
        let imageUrl = "";
        if (item.fields.image && item.fields.image.sys) {
          const assetId = item.fields.image.sys.id;
          const asset = assets.find((a) => a.sys.id === assetId);
          if (
            asset &&
            asset.fields &&
            asset.fields.file &&
            asset.fields.file.url
          ) {
            imageUrl = asset.fields.file.url;
          }
        }
        return {
          ...item,
          imageUrl: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
        };
      });

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage(nextPage);

      // Check if there are more products to fetch
      if (response.data.items.length === 0 || response.data.items.length < 9) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreProducts();
    }
  }, [inView, hasMore]);

  // Handle filter changes
  useEffect(() => {
    // This effect runs whenever the params from the loader change (e.g., from filters)
    setProducts(initialProducts);
    setPage(1);
    setHasMore(true);
    paramsRef.current = initialParams; // Update the ref with new params
  }, [initialProducts, initialParams]);

  return { products, isLoading, hasMore, ref };
}
