import { useLoaderData } from "react-router-dom"; // Don't forget this import
import { Hero } from "../components";
import FeaturedProducts from "../components/FeaturedProducts";
import { customFetch } from "../utils";

export const loader = async () => {
  const response = await customFetch("/entries", {
    params: {
      content_type: "product",
      "fields.featured": true,
    },
  });

  // Handle the case where no featured products are found
  if (response.data.total === 0) {
    return { products: [] };
  }

  const items = response.data.items || [];
  // Use optional chaining `?.` to safely access the 'Asset' property
  const assets = response.data.includes?.Asset || [];

  // Map entries to include image URLs
  const products = items.map((item) => {
    let imageUrl = "";

    if (item.fields.image && item.fields.image.sys) {
      const assetId = item.fields.image.sys.id;
      // Use optional chaining when searching for the asset
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

  return { products };
};

export default function LandingPage() {
  // Use useLoaderData to get the products returned by the loader
  const { products } = useLoaderData();

  return (
    <>
      <Hero />
      {/* Pass the fetched products to the FeaturedProducts component */}
      <FeaturedProducts products={products} />
    </>
  );
}
