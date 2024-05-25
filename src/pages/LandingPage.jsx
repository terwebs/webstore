import { Hero } from "../components";
import FeaturedProducts from "../components/FeaturedProducts";

import { customFetch } from "../utils";
const params = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch("/entries", {
    params: {
      content_type: "product",
      "fields.featured": true,
    },
  });

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

  return { products };
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
