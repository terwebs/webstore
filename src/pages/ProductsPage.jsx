import { Filters, ProductContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch("/entries", {
    params: { ...params, content_type: "product" },
  });

  // console.log(response);
  if (response.data.total === 0) {
    const products = [];
    return { response, products, params };
  }

  const items = response.data.items;
  const assets = response.data.includes.Asset;

  // Map entries to include image URLs
  const products = items.map((item) => {
    let imageUrl = "";

    // Assuming the image field in the product is named 'image'
    if (item.fields.image && item.fields.image.sys) {
      const assetId = item.fields.image.sys.id;
      const asset = assets.find((a) => a.sys.id === assetId);
      if (asset && asset.fields && asset.fields.file && asset.fields.file.url) {
        imageUrl = asset.fields.file.url;
      }
    }

    return {
      ...item,
      imageUrl: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl, // Ensure URL is complete
    };
  });

  // console.log(products);
  return { response, products, params };
};

const ProductsPage = () => {
  return (
    <div>
      <Filters />
      <ProductContainer />
      <PaginationContainer />
    </div>
  );
};

export default ProductsPage;
