// ProductsPage.jsx

import { useLoaderData } from "react-router-dom";
import { Filters, ProductContainer } from "../components";
import { customFetch } from "../utils";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const productsResponse = await customFetch("/entries", {
    params: {
      ...params,
      content_type: "product",
      limit: 9,
      skip: 0,
    },
  });

  // Second fetch for all filters
  const filtersResponse = await customFetch("/entries", {
    params: {
      content_type: "product",
    },
  });

  // Handle the case where no products are found immediately
  if (productsResponse.data.total === 0) {
    return {
      products: [],
      params,
      allProductsForFilters: filtersResponse.data.items || [],
      totalProducts: 0,
    };
  }

  const productsItems = productsResponse.data.items || [];
  // Use optional chaining `?.` to safely access the 'Asset' property
  const productsAssets = productsResponse.data.includes?.Asset || [];
  const filtersItems = filtersResponse.data.items || [];

  const products = productsItems.map((item) => {
    let imageUrl = "";
    if (item.fields.image && item.fields.image.sys) {
      const assetId = item.fields.image.sys.id;
      // You also need to safely find the asset, as productsAssets could be empty
      const asset = productsAssets.find((a) => a.sys.id === assetId);
      if (asset?.fields?.file?.url) {
        // Use optional chaining here too
        imageUrl = asset.fields.file.url;
      }
    }
    return {
      ...item,
      imageUrl: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
    };
  });

  const totalProducts = productsResponse.data.total;

  return {
    products,
    params,
    allProductsForFilters: filtersItems,
    totalProducts,
  };
};

const ProductsPage = () => {
  const { products, params, allProductsForFilters, totalProducts } =
    useLoaderData();

  return (
    <div>
      <Filters allProducts={allProductsForFilters} />
      <ProductContainer
        initialProducts={products}
        initialParams={params}
        totalProducts={totalProducts}
      />
    </div>
  );
};

export default ProductsPage;
