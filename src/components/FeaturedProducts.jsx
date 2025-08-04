import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";
export default function FeaturedProducts({ products }) {
  return (
    <div className="pt-24 ">
      <SectionTitle text="Destacados" />
      <ProductsGrid products={products} />
    </div>
  );
}
