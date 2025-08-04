// hooks/useInfiniteScroll.jsx

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { customFetch } from "../src/utils"; // Import your fetch utility

export function useInfiniteScroll(initialProducts, initialParams) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  const paramsRef = useRef(initialParams);
  const productIdsRef = useRef(new Set(initialProducts.map((p) => p.sys.id)));

  const fetchMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await customFetch("/entries", {
        params: {
          ...paramsRef.current,
          content_type: "product",
          // CORRECTED: Calculate skip based on the number of products already loaded
          skip: (nextPage - 1) * 9,
        },
      });

      const items = response.data.items || [];
      const assets = response.data.includes?.Asset || [];

      const newProducts = items.map((item) => {
        let imageUrl = "";
        if (item.fields.image && item.fields.image.sys) {
          const assetId = item.fields.image.sys.id;
          const asset = assets.find((a) => a.sys.id === assetId);
          if (asset?.fields?.file?.url) {
            imageUrl = asset.fields.file.url;
          }
        }
        return {
          ...item,
          imageUrl: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
        };
      });

      // Filter out any duplicates before adding to the state
      const uniqueNewProducts = newProducts.filter(
        (newProduct) => !productIdsRef.current.has(newProduct.sys.id)
      );

      // Add the new product IDs to our ref
      uniqueNewProducts.forEach((p) => productIdsRef.current.add(p.sys.id));

      setProducts((prevProducts) => [...prevProducts, ...uniqueNewProducts]);
      setPage(nextPage);

      if (uniqueNewProducts.length === 0 || uniqueNewProducts.length < 9) {
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

  // This effect handles filter changes. We now also reset our product IDs ref.
  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(true);
    paramsRef.current = initialParams;
    productIdsRef.current = new Set(initialProducts.map((p) => p.sys.id));
  }, [initialProducts, initialParams]);

  return { products, isLoading, hasMore, ref };
}
