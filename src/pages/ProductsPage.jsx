import { useLoaderData } from "react-router-dom"; // Import the hook
import { Filters, ProductContainer } from "../components";
import { customFetch } from "../utils";

export const loader = async ({ request }) => {
  // ... your loader logic is correct ...
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch("/entries", {
    params: {
      ...params,
      content_type: "product",
      limit: 9, // Add the limit parameter
      skip: 0, // Initial skip is 0
    },
  });

  if (response.data.total === 0) {
    const products = [];
    return { response, products, params };
  }

  const items = response.data.items;
  const assets = response.data.includes.Asset;

  const products = items.map((item) => {
    let imageUrl = "";
    if (item.fields.image && item.fields.image.sys) {
      const assetId = item.fields.image.sys.id;
      const asset = assets.find((a) => a.sys.id === assetId);
      if (asset && asset.fields && asset.fields.file && asset.fields.file.url) {
        imageUrl = asset.fields.file.url;
      }
    }

    return {
      ...item,
      imageUrl: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
    };
  });

  return { response, products, params };
};

const ProductsPage = () => {
  // Use the useLoaderData hook to access the data returned by the loader
  const { products, params } = useLoaderData();

  return (
    <div>
      <Filters />
      {/* Now pass the variables to the ProductContainer */}
      <ProductContainer initialProducts={products} initialParams={params} />
    </div>
  );
};

export default ProductsPage;
