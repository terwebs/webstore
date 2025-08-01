import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import { getContenfulFilters } from "../utils";
import { useState } from "react";

export default function Filters() {
  const { products, params } = useLoaderData();
  const { categories, companies } = getContenfulFilters(products);

  const {
    "fields.title[match]": defaultSearch,
    "fields.category[match]": defaultCategory,
    "fields.company[match]": defaultCompany,
    "fields.price[lte]": defaultPrice,
  } = params;

  // State to manage form values
  const [search, setSearch] = useState(defaultSearch || "");
  const [category, setCategory] = useState(defaultCategory);
  const [company, setCompany] = useState(defaultCompany);
  const [price, setPrice] = useState(defaultPrice || 20000);

  // Function to handle form reset
  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setCompany("All");
    setPrice(20000);
  };

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="buscar producto"
        name="fields.title[match]"
        size="input-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="selecctiona categoria"
        name="fields.category[match]"
        list={categories}
        size="select-sm"
        value={category}
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {/* COMPANIES */}
      {/* <FormSelect
        label="select company"
        name="fields.company[match]"
        list={companies}
        size="select-sm"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      /> */}
      {/* PRICE */}
      <FormRange
        label="Selecciona precio"
        name="fields.price[lte]"
        size="range-sm"
        price={price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm ">
        Buscar
      </button>
      <Link
        className="btn btn-accent btn-sm"
        onClick={handleReset}
        to="/products"
      >
        Reiniciar
      </Link>
    </Form>
  );
}
